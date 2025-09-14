from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    CustomUser,
    UserProfile,
    Document,
    Asset,
    Liability,
    Transaction,
    RetirementAccount,
    Investment,
    CreditScore,
)

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ["username", "email", "google_id", "password"]
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('google_id', 'profile_picture')}),
    )

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "Email", "Net_worth", "Monthly_Budget", "Monthly_Expenses", "Investments", "Total_Balance"]

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ["uploader", "filename", "upload_date", "category", "title", "author"]

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ["user", "name", "asset_type", "current_value", "updated_at"]

@admin.register(Liability)
class LiabilityAdmin(admin.ModelAdmin):
    list_display = ["user", "name", "liability_type", "amount_owed", "interest_rate", "updated_at"]

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ["user", "description", "amount", "transaction_type", "category", "date", "created_at"]

@admin.register(RetirementAccount)
class RetirementAccountAdmin(admin.ModelAdmin):
    list_display = ["user", "account_name", "current_balance", "employee_contribution", "employer_contribution", "last_updated"]

@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ["user", "name", "investment_type", "quantity", "current_value_per_unit", "updated_at"]

@admin.register(CreditScore)
class CreditScoreAdmin(admin.ModelAdmin):
    list_display = ["user", "score", "last_updated"]