import json
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt

# --- MOCK FINANCIAL DATA ---
# This dictionary simulates the financial data source for the chatbot.
MOCK_USER_FINANCIAL_DATA = {
    "assets": {
        "cash": 5000,
        "bank_balances": {
            "checking": 15000,
            "savings": 50000
        },
        "property_value": 350000
    },
    "liabilities": {
        "credit_card_debt": 2500,
        "student_loan": 20000,
        "mortgage": 250000
    },
    "transactions": [
        {"date": "2025-08-01", "description": "Salary Deposit", "amount": 5000, "type": "income"},
        {"date": "2025-08-03", "description": "Groceries", "amount": -150, "type": "expense", "category": "Food"},
        {"date": "2025-08-05", "description": "Mortgage Payment", "amount": -1800, "type": "expense", "category": "Housing"},
        {"date": "2025-08-10", "description": "Internet Bill", "amount": -60, "type": "expense", "category": "Utilities"},
        {"date": "2025-08-15", "description": "Dinner Out", "amount": -80, "type": "expense", "category": "Entertainment"},
        {"date": "2025-07-01", "description": "Salary Deposit", "amount": 5000, "type": "income"},
        {"date": "2025-07-04", "description": "Groceries", "amount": -120, "type": "expense", "category": "Food"},
        {"date": "2025-07-06", "description": "Car Insurance", "amount": -150, "type": "expense", "category": "Transport"},
        {"date": "2025-06-01", "description": "Salary Deposit", "amount": 5000, "type": "income"},
        {"date": "2025-06-05", "description": "Concert Tickets", "amount": -200, "type": "expense", "category": "Entertainment"},
    ],
    "epf_retirement": {
        "current_balance": 75000,
        "employee_contribution_ytd": 6000,
        "employer_match_ytd": 6000
    },
    "credit_score": {
        "score": 780,
        "rating": "Excellent"
    },
    "investments": {
        "stocks": [
            {"ticker": "AAPL", "shares": 10, "current_value": 1500},
            {"ticker": "GOOGL", "shares": 5, "current_value": 7000}
        ],
        "mutual_funds": [
            {"name": "Vanguard S&P 500", "units": 50, "current_value": 20000}
        ]
    }
}

# --- AI Integration (Placeholder) ---
def call_gemini_api(prompt: str, accessible_data: dict) -> str:
    """
    This is a placeholder for the actual API call to a generative AI model.
    """
    query = prompt.split("Current user query:")[-1].strip().lower()

    if "credit score" in query and "credit_score" not in accessible_data:
        return "I am unable to answer that question. You have not granted access to your credit score data."
    if "epf" in query and "epf_retirement" not in accessible_data:
        return "I cannot provide details about your retirement fund. Please grant access to your EPF/Retirement data first."
    if "investment" in query and "investments" not in accessible_data:
        return "To discuss your portfolio, I need access to your investment data. Please update your privacy settings."

    if "how much did i spend last month" in query:
        return "Based on the transaction data you've shared, you spent approximately $370 last month on items like groceries and car insurance. Would you like a more detailed breakdown by category?"
    elif "can i afford a vacation" in query:
        return "Affording a vacation depends on its cost. Your current savings are healthy, and your monthly income consistently exceeds your expenses. To give you a more precise answer, could you tell me the estimated cost of the vacation?"
    else:
        return "I have received your query. Based on the data you've provided, I am analyzing it to provide you with actionable insights. How can I further assist you?"


@csrf_exempt
def update_permissions(request: HttpRequest) -> JsonResponse:
    """
    API endpoint to grant or revoke access to financial data categories.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            category = data.get('category')
            has_access = data.get('has_access')

            if category is None or has_access is None:
                return JsonResponse({'status': 'error', 'message': 'Missing category or access status.'}, status=400)

            if 'permissions' not in request.session:
                request.session['permissions'] = {
                    "assets": True, "liabilities": True, "transactions": True,
                    "epf_retirement": True, "credit_score": True, "investments": True
                }

            request.session['permissions'][category] = bool(has_access)
            request.session.modified = True

            return JsonResponse({'status': 'success', 'message': f'Permissions for {category} updated.'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON.'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed.'}, status=405)


@csrf_exempt
def chat_handler(request: HttpRequest) -> JsonResponse:
    """
    Main API endpoint for handling natural-language queries from the user.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_message = data.get('message')

            if not user_message:
                return JsonResponse({'status': 'error', 'message': 'Message cannot be empty.'}, status=400)

            permissions = request.session.get('permissions', {
                "assets": True, "liabilities": True, "transactions": True,
                "epf_retirement": True, "credit_score": True, "investments": True
            })
            chat_history = request.session.get('chat_history', [])

            accessible_data = {
                category: MOCK_USER_FINANCIAL_DATA[category]
                for category, has_access in permissions.items() if has_access
            }

            prompt = f"""
            You are a helpful and professional AI personal finance assistant.
            Your role is to analyze the user's financial data to answer their questions and provide actionable insights.

            RULES:
            1. Your knowledge is STRICTLY limited to the JSON data provided below. Do not use external knowledge.
            2. You MUST respect the user's privacy. If a user asks about a data category that is NOT present in the provided JSON, you MUST state that you do not have access to that information. For example, if the 'credit_score' key is missing, respond with: "I am unable to answer that question. You have not granted access to your credit score data."
            3. Provide clear, concise, and user-friendly answers.
            4. Maintain the context of the conversation.

            ---
            CONTEXT: PREVIOUS CONVERSATION
            {json.dumps(chat_history, indent=2)}
            ---
            DATA: USER'S ACCESSIBLE FINANCIAL DATA
            {json.dumps(accessible_data, indent=2)}
            ---
            Current user query: "{user_message}"
            """

            ai_response = call_gemini_api(prompt, accessible_data)

            chat_history.append({"role": "user", "content": user_message})
            chat_history.append({"role": "assistant", "content": ai_response})
            request.session['chat_history'] = chat_history
            request.session.modified = True

            return JsonResponse({'reply': ai_response})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON.'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed.'}, status=405)
