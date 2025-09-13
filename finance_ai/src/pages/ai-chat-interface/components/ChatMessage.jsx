import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, onFollowUpClick, onExpandChart }) => {
  const isUser = message?.sender === 'user';
  
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2:digit',
      minute: '2:digit'
    });
  };

  const renderContent = () => {
    if (message?.type === 'chart') {
      return (
        <div className="bg-muted rounded-lg p-4 mt-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">{message?.chartTitle}</h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="Expand"
              onClick={() => onExpandChart(message)}
            >
              Expand
            </Button>
          </div>
          <div className="h-48 bg-card rounded border flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Icon name="BarChart3" size={48} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">{message?.chartDescription}</p>
            </div>
          </div>
        </div>
      );
    }

    if (message?.type === 'table') {
      return (
        <div className="bg-muted rounded-lg p-4 mt-2 overflow-x-auto">
          <h4 className="font-medium text-foreground mb-3">{message?.tableTitle}</h4>
          <div className="min-w-full">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {message?.tableHeaders?.map((header, index) => (
                    <th key={index} className="text-left py-2 px-3 font-medium text-foreground">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {message?.tableData?.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-border/50">
                    {row?.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-2 px-3 text-muted-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="whitespace-pre-wrap text-sm leading-relaxed">
        {message?.content}
      </div>
    );
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          {isUser ? (
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Bot" size={16} color="white" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block px-4 py-3 rounded-2xl ${
            isUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-card border border-border text-foreground'
          }`}>
            {renderContent()}
          </div>

          {/* Timestamp */}
          <div className={`text-xs text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {formatTimestamp(message?.timestamp)}
          </div>

          {/* Follow-up Questions (AI messages only) */}
          {!isUser && message?.followUpQuestions && message?.followUpQuestions?.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-muted-foreground">Suggested follow-ups:</p>
              <div className="flex flex-wrap gap-2">
                {message?.followUpQuestions?.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onFollowUpClick(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Data Sources (AI messages only) */}
          {!isUser && message?.dataSources && message?.dataSources?.length > 0 && (
            <div className="mt-2 flex items-center space-x-2">
              <Icon name="Database" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Data from: {message?.dataSources?.join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;