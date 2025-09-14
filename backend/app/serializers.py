from rest_framework import serializers
from .models import UserProfile, CustomUser

class FinancialProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'net_worth', 'monthly_budget', 'total_balance', 'monthly_spending', 'investments', 'credit_score', 'created_at', 'updated_at']

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the CustomUser model, used for retrieving user details.
    """
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class RegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for handling new user registrations.
    Includes password validation and creation logic.
    """
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm password")

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password', 'password2', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'username': {'required': False} # Username will be set from email
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        # Set username to be the same as email
        attrs['username'] = attrs['email']
        return attrs

    def create(self, validated_data):
        # Remove password2 from validated_data before creating user
        validated_data.pop('password2', None)
        
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user