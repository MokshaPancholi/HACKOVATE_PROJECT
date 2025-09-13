import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const TermsAndPrivacy = ({ agreements, onAgreementChange, errors }) => {
  const [activeModal, setActiveModal] = useState(null);

  const documents = {
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'September 1, 2025',
      content: `Welcome to FinanceAI Assistant. By using our service, you agree to these terms.

1. SERVICE DESCRIPTION
FinanceAI Assistant provides AI-powered financial analysis and insights based on your financial data. Our service helps you understand spending patterns, optimize budgets, and make informed financial decisions.

2. USER RESPONSIBILITIES
- Provide accurate financial information
- Maintain the security of your account credentials
- Use the service in compliance with applicable laws
- Review and verify all AI-generated recommendations

3. DATA USAGE AND PRIVACY
- We process your financial data solely to provide our services
- Your data is encrypted and stored securely
- You maintain full control over data access permissions
- We never sell or share your personal financial information

4. AI RECOMMENDATIONS DISCLAIMER
- AI-generated insights are for informational purposes only
- Not a substitute for professional financial advice
- Users should verify all recommendations before taking action
- Past performance does not guarantee future results

5. SERVICE AVAILABILITY
- We strive for 99.9% uptime but cannot guarantee uninterrupted service
- Scheduled maintenance will be announced in advance
- Emergency maintenance may occur without notice

6. LIMITATION OF LIABILITY
Our liability is limited to the amount paid for the service in the preceding 12 months. We are not liable for indirect, incidental, or consequential damages.

7. TERMINATION
Either party may terminate this agreement at any time. Upon termination, your data will be securely deleted within 30 days unless legally required to retain it.

8. CHANGES TO TERMS
We may update these terms periodically. Users will be notified of material changes via email or in-app notification.

Contact us at legal@financeai.com for questions about these terms.`
    },
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'September 1, 2025',
      content: `Your privacy is fundamental to our service. This policy explains how we collect, use, and protect your information.

1. INFORMATION WE COLLECT
- Account information (name, email, password)
- Financial data you choose to connect (bank accounts, transactions, investments)
- Usage data (how you interact with our service)
- Device information (browser type, IP address)

2. HOW WE USE YOUR INFORMATION
- Provide AI-powered financial insights and recommendations
- Improve our service and develop new features
- Communicate with you about your account and our service
- Ensure security and prevent fraud

3. DATA SHARING AND DISCLOSURE
We do not sell your personal information. We may share data only in these limited circumstances:
- With your explicit consent
- To comply with legal obligations
- To protect our rights and prevent fraud
- With service providers under strict confidentiality agreements

4. DATA SECURITY
- All data is encrypted in transit and at rest using AES-256 encryption
- Multi-factor authentication protects your account
- Regular security audits and penetration testing
- SOC 2 Type II certified infrastructure

5. YOUR PRIVACY RIGHTS
- Access your personal data
- Correct inaccurate information
- Delete your account and data
- Export your data in a portable format
- Opt-out of non-essential communications

6. DATA RETENTION
- Account data: Retained while your account is active
- Financial data: Deleted within 30 days of account closure
- Usage logs: Retained for 12 months for security purposes

7. INTERNATIONAL TRANSFERS
Your data may be processed in countries other than your residence. We ensure adequate protection through appropriate safeguards.

8. CHILDREN'S PRIVACY
Our service is not intended for users under 18. We do not knowingly collect information from children.

9. COOKIES AND TRACKING
We use essential cookies for service functionality and analytics cookies to improve our service. You can control cookie preferences in your browser.

10. CONTACT US
For privacy questions or to exercise your rights, contact us at:
Email: privacy@financeai.com
Address: 123 Finance Street, San Francisco, CA 94105

This policy was last updated on September 1, 2025.`
    }
  };

  const openModal = (type) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleAgreementChange = (type, checked) => {
    onAgreementChange({ [type]: checked });
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-foreground mb-4">Legal Agreements</h2>
        
        <div className="space-y-4">
          <div className={`p-4 border rounded-lg ${errors?.terms ? 'border-error bg-error/5' : 'border-border'}`}>
            <Checkbox
              checked={agreements?.terms || false}
              onChange={(e) => handleAgreementChange('terms', e?.target?.checked)}
              label={
                <span className="text-sm">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => openModal('terms')}
                    className="text-primary hover:text-primary/80 underline font-medium"
                  >
                    Terms of Service
                  </button>
                </span>
              }
              error={errors?.terms}
            />
          </div>

          <div className={`p-4 border rounded-lg ${errors?.privacy ? 'border-error bg-error/5' : 'border-border'}`}>
            <Checkbox
              checked={agreements?.privacy || false}
              onChange={(e) => handleAgreementChange('privacy', e?.target?.checked)}
              label={
                <span className="text-sm">
                  I acknowledge that I have read and understand the{' '}
                  <button
                    type="button"
                    onClick={() => openModal('privacy')}
                    className="text-primary hover:text-primary/80 underline font-medium"
                  >
                    Privacy Policy
                  </button>
                </span>
              }
              error={errors?.privacy}
            />
          </div>

          <div className={`p-4 border rounded-lg ${errors?.marketing ? 'border-error bg-error/5' : 'border-border'}`}>
            <Checkbox
              checked={agreements?.marketing || false}
              onChange={(e) => handleAgreementChange('marketing', e?.target?.checked)}
              label={
                <span className="text-sm">
                  I would like to receive product updates and financial tips via email (optional)
                </span>
              }
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="text-foreground font-medium mb-1">Important Notice</p>
              <p className="text-muted-foreground">
                By creating an account, you confirm that you are at least 18 years old and have 
                the legal capacity to enter into this agreement. You can withdraw your consent 
                at any time by contacting our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col modal-shadow">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {documents?.[activeModal]?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Last updated: {documents?.[activeModal]?.lastUpdated}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-sm max-w-none">
                {documents?.[activeModal]?.content?.split('\n\n')?.map((paragraph, index) => (
                  <p key={index} className="text-sm text-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button
                variant="outline"
                onClick={closeModal}
              >
                Close
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  handleAgreementChange(activeModal, true);
                  closeModal();
                }}
              >
                I Agree
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsAndPrivacy;