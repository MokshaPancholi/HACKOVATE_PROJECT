from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
import decimal

# Note: In a full Django project, it's best practice to reference the custom user model
# in ForeignKey or OneToOneField relationships using settings.AUTH_USER_MODEL,
# e.g., models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
# For simplicity in this single file, we are directly referencing the CustomUser class.

# --- User and Profile Models ---

class CustomUser(AbstractUser):
    """
    An extension of the default User model to include Google-specific fields.
    """
    google_id = models.CharField(max_length=20, unique=True, null=True, blank=True)
    
    def __str__(self):
        return self.username

class UserProfile(models.Model):
    """
    Stores additional user information, like their role within the application.
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    Email = models.EmailField(max_length=100, null=True, blank=True)
    Password = models.CharField(max_length=100, null=True, blank=True)
    Net_worth = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    Monthly_Budget = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    Monthly_Expenses = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    Investments = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    Total_Balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.user.username} - {self.get_role_display()}"

class Document(models.Model):
    """
    Represents an uploaded document with its metadata.
    """
    uploader = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='documents')
    filename = models.CharField(max_length=255)
    filepath = models.CharField(max_length=512)
    upload_date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    summary = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title or self.filename

# --- Core Financial Models ---

class Asset(models.Model):
    """
    Represents a user's assets, such as cash, bank balances, or property.
    """
    ASSET_TYPE_CHOICES = [
        ('CASH', 'Cash'),
        ('BANK', 'Bank Account'),
        ('PROPERTY', 'Property'),
        ('OTHER', 'Other'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='assets')
    name = models.CharField(max_length=100, help_text="e.g., Savings Account, Main Residence")
    asset_type = models.CharField(max_length=10, choices=ASSET_TYPE_CHOICES, default='BANK')
    current_value = models.DecimalField(max_digits=15, decimal_places=2, validators=[MinValueValidator(decimal.Decimal('0.00'))])
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s {self.name} ({self.get_asset_type_display()})"

class Liability(models.Model):
    """
    Represents a user's liabilities, such as loans or credit card debt.
    """
    LIABILITY_TYPE_CHOICES = [
        ('LOAN', 'Loan'),
        ('CREDIT_CARD', 'Credit Card Debt'),
        ('MORTGAGE', 'Mortgage'),
        ('OTHER', 'Other'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='liabilities')
    name = models.CharField(max_length=100, help_text="e.g., Student Loan, Visa Card")
    liability_type = models.CharField(max_length=15, choices=LIABILITY_TYPE_CHOICES, default='LOAN')
    amount_owed = models.DecimalField(max_digits=15, decimal_places=2, validators=[MinValueValidator(decimal.Decimal('0.00'))])
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.0, help_text="Annual interest rate in percentage")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s {self.name} ({self.get_liability_type_display()})"

class Transaction(models.Model):
    """
    Represents a single financial transaction, like income, an expense, or a transfer.
    """
    TRANSACTION_TYPE_CHOICES = [
        ('INCOME', 'Income'),
        ('EXPENSE', 'Expense'),
        ('TRANSFER', 'Transfer'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='transactions')
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE_CHOICES)
    category = models.CharField(max_length=50, blank=True, null=True, help_text="e.g., Groceries, Salary, Utilities")
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.date} - {self.description} ({self.get_transaction_type_display()}) - {self.amount}"

# --- Retirement and Investment Models ---

class RetirementAccount(models.Model):
    """
    Tracks retirement accounts like EPF, 401(k), etc.
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='retirement_account')
    account_name = models.CharField(max_length=100, default="EPF/Retirement Fund")
    current_balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    employee_contribution = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, help_text="Total contributed by employee")
    employer_contribution = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, help_text="Total matched/contributed by employer")
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s {self.account_name}"

class Investment(models.Model):
    """
    Represents a user's investments in stocks, mutual funds, etc.
    """
    INVESTMENT_TYPE_CHOICES = [
        ('STOCK', 'Stock'),
        ('MUTUAL_FUND', 'Mutual Fund'),
        ('BOND', 'Bond'),
        ('CRYPTO', 'Cryptocurrency'),
        ('OTHER', 'Other'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='investments')
    name = models.CharField(max_length=100, help_text="e.g., Reliance Industries, Nifty 50 Index Fund")
    investment_type = models.CharField(max_length=15, choices=INVESTMENT_TYPE_CHOICES)
    quantity = models.DecimalField(max_digits=15, decimal_places=6, default=0.0, help_text="e.g., number of shares or units")
    current_value_per_unit = models.DecimalField(max_digits=15, decimal_places=2)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_value(self):
        if self.quantity is not None and self.current_value_per_unit is not None:
            return self.quantity * self.current_value_per_unit
        return decimal.Decimal('0.00')

    def __str__(self):
        return f"{self.user.username}'s Investment in {self.name}"

# --- Financial Health Model ---

class CreditScore(models.Model):
    """
    Stores a mock credit score for a user.
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='credit_score')
    score = models.IntegerField(
        validators=[MinValueValidator(300), MaxValueValidator(850)],
        help_text="A mock credit score, typically between 300 and 850"
    )
    last_updated = models.DateField(auto_now=True)

    @property
    def rating(self):
        """
        Provides a descriptive rating based on the score.
        """
        if not self.score:
            return "N/A"
        if self.score >= 800:
            return "Excellent"
        elif self.score >= 740:
            return "Very Good"
        elif self.score >= 670:
            return "Good"
        elif self.score >= 580:
            return "Fair"
        else:
            return "Poor"

    def __str__(self):
        return f"{self.user.username}'s Credit Score: {self.score} ({self.rating})"
