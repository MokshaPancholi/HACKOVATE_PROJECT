import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const suggestedQueries = [
    "Can I afford a vacation to Europe?",
    "Analyze my spending patterns this month",
    "How much should I save for retirement?",
    "What are my biggest expenses?",
    "Show me my investment performance",
    "Help me create a budget plan"
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  };

  const handleSuggestedQuery = (query) => {
    if (!isLoading) {
      onSendMessage(query);
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {/* Suggested queries */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQueries?.slice(0, 3)?.map((query, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestedQuery(query)}
              disabled={isLoading}
              className="text-xs h-8 px-3 bg-muted hover:bg-muted/80"
            >
              {query}
            </Button>
          ))}
        </div>
      </div>
      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your finances..."
            disabled={isLoading}
            className="w-full px-4 py-3 pr-12 bg-background border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm min-h-[48px] max-h-[120px]"
            rows={1}
          />
          
          {/* Character count */}
          {message?.length > 0 && (
            <div className="absolute bottom-2 right-12 text-xs text-muted-foreground">
              {message?.length}
            </div>
          )}
        </div>

        <Button
          type="submit"
          size="icon"
          disabled={!message?.trim() || isLoading}
          loading={isLoading}
          className="h-12 w-12 rounded-full"
        >
          <Icon name="Send" size={20} />
        </Button>
      </form>
      {/* Input hints */}
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Privacy protected</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Zap" size={12} />
            <span>AI powered</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;