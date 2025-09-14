from .serializers import RegistrationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from app.models import CustomUser, UserProfile
from .serializers import FinancialProfileSerializer, UserSerializer, RegistrationSerializer
from django.views.generic import TemplateView
from django.shortcuts import redirect
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.conf import settings
from rest_framework.authtoken.models import Token
import json
import requests

# --- 1. User Authentication Views ---

@api_view(['POST'])
@permission_classes([AllowAny])
def register_api(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'success': True, 'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """
    Handles user login using token authentication, which is suitable for SPAs.
    """
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
            try:
                serializer.save()
                return Response(serializer.data, status=201)
            except Exception as e:
                return Response({"error": str(e)}, status=400)

        errors = serializer.errors
        if 'user' in errors:
            errors['user_detail'] = "User ID provided does not exist or is invalid."
        return Response(errors, status=400)

    elif request.method == 'GET':
        profiles = UserProfile.objects.all()
        serializer = UserProfile(profiles, many=True)
        return Response(serializer.data)


class ReactAppView(TemplateView):
    template_name = "index.html"

MOCKAPI_KEY = "68c5e308a712aaca2b69c9fb"
MOCK_USER_FINANCIAL_DATA = f"https://{MOCKAPI_KEY}.mockapi.io/UserProfile"

def fetch_mock_financial_data():
    try:
        response = requests.get(MOCK_USER_FINANCIAL_DATA)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list) and len(data) > 0:
                return data[0]  # Return the first user's data
            return {}
        else:
            print(f"Error fetching mock data: {response.status_code}")
            return {}
    except Exception as e:
        print(f"Exception during mock data fetch: {e}")
        return {}


def call_gemini_api(prompt: str, accessible_data: dict) -> str:
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
            2. You MUST respect the user's privacy. If a user asks about a data category that is NOT present in the provided JSON, you MUST state that you do not have access to that information.
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


def google_auth_login(request):
    redirect_uri = settings.GOOGLE_REDIRECT_URI
    client_id = settings.GOOGLE_CLIENT_ID
    return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&scope=openid%20email%20profile")


def google_auth_callback(request):
    code = request.GET.get('code')

    token_response = requests.post('https://oauth2.googleapis.com/token', data={
        'code': code,
        'client_id': settings.GOOGLE_CLIENT_ID,
        'client_secret': settings.GOOGLE_CLIENT_SECRET,
        'redirect_uri': settings.GOOGLE_REDIRECT_URI,
        'grant_type': 'authorization_code',
    })

    token_data = token_response.json()
    access_token = token_data.get('access_token')

    if not access_token:
        return redirect('home')

    user_info_response = requests.get('https://www.googleapis.com/oauth2/v1/userinfo', params={
        'access_token': access_token,
    })

    user_info = user_info_response.json()
    google_id = user_info.get('id')
    email = user_info.get('email')
    name = user_info.get('name')
    picture = user_info.get('picture')

    if not google_id or not email:
        return redirect('home')

    return redirect('home')


@login_required
def logout_view(request):
    try:
        request.user.auth_token.delete()
    except (AttributeError, Token.DoesNotExist):
        pass # User was not logged in or token was already removed
    return Response(status=status.HTTP_204_NO_CONTENT)