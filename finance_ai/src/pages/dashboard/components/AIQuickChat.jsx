import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIQuickChat = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    "How much can I save this month?",
    "What\'s my spending pattern?",
    "Should I invest more?",
    "How\'s my credit score trending?"
  ];

  const handleSendMessage = async () => {
    if (!message?.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      setMessage('');
    }, 2000);
  };

  const handleQuickQuestion = (question) => {
    setMessage(question);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="MessageSquare" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">AI Assistant</h2>
            <p className="text-sm text-muted-foreground">Ask about your finances</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = '/ai-chat-interface'}
          className="text-primary hover:text-primary/80"
        >
          View Full Chat
          <Icon name="ArrowRight" size={16} className="ml-1" />
        </Button>
      </div>
      {/* Quick Questions */}
      <div className="mb-4">
        <p className="text-sm font-medium text-foreground mb-2">Quick questions:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickQuestions?.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-left p-3 bg-muted hover:bg-muted/80 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      {/* Message Input */}
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            placeholder="Ask me anything about your finances..."
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
        </div>
        <Button
          onClick={handleSendMessage}
          disabled={!message?.trim() || isLoading}
          loading={isLoading}
          iconName="Send"
          size="lg"
          className="px-4"
        >
          {isLoading ? 'Thinking...' : 'Ask'}
        </Button>
      </div>
      {/* AI Status */}
      <div className="flex items-center justify-center mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>AI Assistant is online and ready to help</span>
        </div>
      </div>
    </div>
  );
};

export default AIQuickChat;