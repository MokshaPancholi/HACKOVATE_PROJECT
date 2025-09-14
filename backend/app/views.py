# --- Django and REST Framework Imports ---
from django.shortcuts import redirect
from django.views.generic import TemplateView
from django.http import HttpRequest, JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

# --- Local App Imports ---
from app.models import CustomUser, UserProfile
from .serializers import FinancialProfileSerializer, UserSerializer, RegistrationSerializer

# --- Standard Library & Third-Party Imports ---
import json
import requests
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# --- API AND SERVICE CONFIGURATION ---
# Get your Gemini key from Google AI Studio: https://aistudio.google.com/app/apikey
import requests

OPENROUTER_API_KEY = "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"
url = "https://openrouter.ai/api/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "model": "openai/gpt-3.5-turbo",  # or another supported model
    "messages": [
        {"role": "user", "content": "Hello, OpenRouter!"}
    ]
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())
MOCKAPI_KEY = "68c5e308a712aaca2b69c9fb"
MOCK_API_URL = f"https://{MOCKAPI_KEY}.mockapi.io/UserProfile"


# ==============================================================================
# --- 1. AI & Machine Learning Integration ---
# ==============================================================================

# Define your Gemini API key and endpoint here
OPENROUTER_API_KEY = "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"
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

def call_openrouter_api(prompt: str) -> str:
    """
    Calls the OpenRouter API with the provided prompt and financial data.
    """
    if not OPENROUTER_API_KEY or OPENROUTER_API_KEY == "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":
        return "Error: OPENROUTER_API_KEY is not configured on the server."

    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(OPENROUTER_API_URL, headers=headers, json=payload)
        response.raise_for_status()  # Raise an exception for HTTP errors
        result = response.json()

        # Safely extract the text from the API response
        if (
            "candidates" in result and result["candidates"] and
            "content" in result["candidates"][0] and
            "parts" in result["candidates"][0]["content"] and
            result["candidates"][0]["content"]["parts"]
        ):
            return result["candidates"][0]["content"]["parts"][0]["text"]
        else:
            return "Sorry, I received an unexpected response from the AI. Please try again."

    except requests.exceptions.RequestException as e:
        print(f"Gemini API Call Error: {e}")
        return "Sorry, I'm having trouble connecting to the AI service right now."


def train_and_evaluate_marketing_model():
    """
    Utility function to train the bank marketing prediction model.
    Note: This is a long-running task and should not be run on every web request.
    Consider running this as a separate script or a Django management command.
    """
    print("--- Starting Bank Marketing Model Training ---")
    try:
        # NOTE: Ensure 'bank-full.csv' is accessible to the Django application.
        df = pd.read_csv('bank-full.csv', delimiter=';')
        print("Step 1: Dataset loaded successfully.")

        # Preprocessing
        for col in ['default', 'housing', 'loan', 'y']:
            df[col] = df[col].apply(lambda x: 1 if x == 'yes' else 0)
        df = pd.get_dummies(df, columns=['job', 'marital', 'education', 'contact', 'month', 'poutcome'], drop_first=True)

        X = df.drop('y', axis=1)
        y = df['y']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

        # Train and Evaluate
        model = LogisticRegression(solver='liblinear', random_state=42)
        model.fit(X_train, y_train)
        predictions = model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)

        print("\n--- Model Evaluation Results ---")
        print(f"Accuracy: {accuracy:.2f}")
        print("\nClassification Report:\n", classification_report(y_test, predictions))
        print("--- Model Training Complete ---")

    except FileNotFoundError:
        print("\nERROR: 'bank-full.csv' not found.")
    except Exception as e:
        print(f"\nAn error occurred during model training: {e}")


# ==============================================================================
# --- 2. Core API Views (Authentication, Chat, Profiles) ---
# ==============================================================================

@csrf_exempt
def chat_handler(request: HttpRequest) -> JsonResponse:
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed.'}, status=405)
    
    try:
        # 1. FETCH LIVE FINANCIAL DATA FROM MOCK API
        live_financial_data = fetch_mock_financial_data()
        if not live_financial_data:
             return JsonResponse({'reply': 'Sorry, I am unable to access your financial data at the moment.'}, status=500)

        # 2. PROCESS USER REQUEST AND PERMISSIONS
        data = json.loads(request.body)
        user_message = data.get('message')
        if not user_message:
            return JsonResponse({'status': 'error', 'message': 'Message cannot be empty.'}, status=400)
        
        permissions = request.session.get('permissions', {
            "assets": True, "liabilities": True, "transactions": True,
            "epf_retirement": True, "credit_score": True, "investments": True
        })
        chat_history = request.session.get('chat_history', [])

        # 3. CONSTRUCT ACCESSIBLE DATA BASED ON PERMISSIONS
        accessible_data = {
            category: live_financial_data.get(category, {})
            for category, has_access in permissions.items() if has_access
        }

        # 4. CREATE PROMPT AND CALL GEMINI API
        prompt = f"""
        You are a helpful and professional AI personal finance assistant. Your role is to analyze the user's financial data to answer their questions and provide actionable insights.
        RULES:
        1. Your knowledge is STRICTLY limited to the JSON data provided below. Do not use external knowledge.
        2. You MUST respect the user's privacy. If a user asks about a data category that is NOT present in the provided JSON, you MUST state that you do not have access to that information and suggest they grant permission.
        3. Provide clear, concise, and user-friendly answers.
        ---
        CONTEXT: PREVIOUS CONVERSATION
        {json.dumps(chat_history, indent=2)}
        ---
        DATA: USER'S ACCESSIBLE FINANCIAL DATA
        {json.dumps(accessible_data, indent=2)}
        ---
        Current user query: "{user_message}"
        """

        ai_response = call_openrouter_api(prompt)

        # 5. UPDATE SESSION HISTORY
        chat_history.append({"role": "user", "content": user_message})
        chat_history.append({"role": "assistant", "content": ai_response})
        request.session['chat_history'] = chat_history
        request.session.modified = True

        return JsonResponse({'reply': ai_response})

    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON.'}, status=400)
    except Exception as e:
        print(f"Error in chat_handler: {e}")
        return JsonResponse({'status': 'error', 'message': 'An internal server error occurred.'}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_api(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(username=email, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_info': UserSerializer(user).data
        })
    return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
def financial_profile_api(request):
    if request.method == 'POST':
        serializer = FinancialProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        # Assuming FinancialProfile model exists and is what you want to query
        from app.models import FinancialProfile
        profiles = FinancialProfile.objects.all()
        serializer = FinancialProfileSerializer(profiles, many=True)
        return Response(serializer.data)


# ==============================================================================
# --- 3. Utility and Helper Views ---
# ==============================================================================

class ReactAppView(TemplateView):
    """Serves the main React application."""
    template_name = "index.html"


def fetch_mock_financial_data():
    """Fetches financial data from the external mock API service."""
    try:
        response = requests.get(MOCK_API_URL)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list) and len(data) > 0:
                return data[0]  # Return the first user's data object
        print(f"Error fetching mock data: Status {response.status_code}")
        return {}
    except Exception as e:
        print(f"Exception during mock data fetch: {e}")
        return {}


@csrf_exempt
def update_permissions(request: HttpRequest) -> JsonResponse:
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


# ==============================================================================
# --- 4. Google OAuth and Logout Views (Example implementations) ---
# ==============================================================================

def google_auth_login(request):
    """Redirects the user to Google's OAuth 2.0 server."""
    redirect_uri = settings.GOOGLE_REDIRECT_URI
    client_id = settings.GOOGLE_CLIENT_ID
    return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&scope=openid%20email%20profile")

def google_auth_callback(request):
    """Handles the callback from Google after user authentication."""
    # This is a placeholder. A full implementation would exchange the code
    # for a token, fetch user info, and then log in or create a user in Django.
    code = request.GET.get('code')
    # ... logic to handle token exchange and user creation/login ...
    return redirect('home') # Redirect to a home page after login

@api_view(['POST'])
def logout_view(request):
    """Logs the user out by deleting their authentication token."""
    try:
        request.user.auth_token.delete()
    except (AttributeError, Token.DoesNotExist):
        pass
    return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
