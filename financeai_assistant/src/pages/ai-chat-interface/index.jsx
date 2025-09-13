import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import EmptyState from './components/EmptyState';
import ContextualSidebar from './components/ContextualSidebar';
import DataPermissionPanel from './components/DataPermissionPanel';

const AIChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [currentContext, setCurrentContext] = useState('spending');
  const [permissions, setPermissions] = useState({
    accounts: true,
    transactions: true,
    investments: false,
    creditScore: true,
    budgets: true,
    goals: false
  });

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mock AI responses
  const mockResponses = {
    vacation: {
      type: 'text',
      content: `Based on your current financial situation, here's my analysis for a European vacation:\n\n💰 **Budget Assessment:**\n• Available vacation fund: $3,247\n• Recommended budget: $2,500-3,000\n• Safety buffer: $500-750\n\n✅ **Good news!** You can afford a moderate European vacation. I recommend:\n• 7-10 day trip to 2-3 cities\n• Mid-range accommodations ($80-120/night)\n• Budget $100-150/day for food and activities\n\n📊 To make this happen without impacting your emergency fund, consider:\n• Booking 2-3 months in advance for better deals\n• Using travel rewards if available\n• Setting aside $300/month for the next 2 months`,
      followUpQuestions: [
        "Show me specific destination recommendations",
        "How can I save more for this trip?",
        "What if I want a luxury vacation instead?"
      ],
      dataSources: ['Bank Accounts', 'Budgets', 'Savings Goals']
    },
    spending: {
      type: 'chart',content: 'Here\'s your spending analysis for the last 3 months:',
      chartTitle: 'Monthly Spending Breakdown',
      chartDescription: 'Your spending has increased by 12% compared to the previous quarter',
      followUpQuestions: [
        "Which categories increased the most?",
        "How can I reduce my spending?",
        "Compare this to my budget limits"
      ],
      dataSources: ['Transactions', 'Bank Accounts']
    },
    budget: {
      type: 'table',
      content: 'Here\'s a personalized monthly budget plan based on your income and spending patterns:',
      tableTitle: 'Recommended Monthly Budget',
      tableHeaders: ['Category', 'Current Spending', 'Recommended', 'Difference'],
      tableData: [
        ['Housing', '$1,200', '$1,200', '$0'],
        ['Groceries', '$456', '$400', '-$56'],
        ['Dining Out', '$287', '$200', '-$87'],
        ['Transportation', '$234', '$250', '+$16'],
        ['Entertainment', '$156', '$150', '-$6'],
        ['Savings', '$300', '$500', '+$200'],
        ['Emergency Fund', '$100', '$200', '+$100']
      ],
      followUpQuestions: [
        "How do I stick to this budget?",
        "What if I can't reduce dining expenses?",
        "Set up automatic savings transfers"
      ],
      dataSources: ['Transactions', 'Budgets', 'Bank Accounts']
    }
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: messageText,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      let aiResponse;
      
      // Determine response type based on message content
      if (messageText?.toLowerCase()?.includes('vacation') || messageText?.toLowerCase()?.includes('afford')) {
        aiResponse = mockResponses?.vacation;
        setCurrentContext('accounts');
      } else if (messageText?.toLowerCase()?.includes('spending') || messageText?.toLowerCase()?.includes('pattern')) {
        aiResponse = mockResponses?.spending;
        setCurrentContext('spending');
      } else if (messageText?.toLowerCase()?.includes('budget') || messageText?.toLowerCase()?.includes('plan')) {
        aiResponse = mockResponses?.budget;
        setCurrentContext('budgets');
      } else {
        // Default response
        aiResponse = {
          type: 'text',
          content: `I understand you're asking about: "${messageText}"\n\nBased on your financial data, I can help you with:\n• Detailed analysis of your question\n• Personalized recommendations\n• Actionable next steps\n\nTo provide more specific insights, could you clarify what aspect you'd like me to focus on?`,
          followUpQuestions: [
            "Show me my account balances",
            "Analyze my recent transactions",
            "Help me with budget planning"
          ],
          dataSources: ['General Financial Data']
        };
      }

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        timestamp: new Date(),
        ...aiResponse
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleFollowUpClick = (question) => {
    handleSendMessage(question);
  };

  const handleExpandChart = (message) => {
    // In a real app, this would open a modal or navigate to detailed view
    console.log('Expanding chart:', message);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleTogglePermission = (categoryId, value) => {
    if (categoryId === 'all') {
      const newPermissions = {};
      Object.keys(permissions)?.forEach(key => {
        newPermissions[key] = value;
      });
      setPermissions(newPermissions);
    } else {
      setPermissions(prev => ({
        ...prev,
        [categoryId]: !prev?.[categoryId]
      }));
    }
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/dashboard', isHome: true },
    { label: 'AI Assistant', path: '/ai-chat-interface', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Breadcrumbs */}
        <div className="bg-card border-b border-border px-6 py-3">
          <Breadcrumbs customItems={breadcrumbItems} />
        </div>

        <div className="flex h-[calc(100vh-112px)]">
          {/* Contextual Sidebar */}
          {sidebarVisible && (
            <div className="hidden lg:block">
              <ContextualSidebar 
                currentContext={currentContext}
                financialSummary={{}}
              />
            </div>
          )}

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <ChatHeader
              onClearChat={handleClearChat}
              onToggleSidebar={handleToggleSidebar}
              sidebarVisible={sidebarVisible}
              messageCount={messages?.length}
            />

            {/* Messages Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 bg-muted/20"
            >
              {messages?.length === 0 ? (
                <EmptyState onSuggestedQuery={handleSendMessage} />
              ) : (
                <div className="max-w-4xl mx-auto">
                  {messages?.map((message) => (
                    <ChatMessage
                      key={message?.id}
                      message={message}
                      onFollowUpClick={handleFollowUpClick}
                      onExpandChart={handleExpandChart}
                    />
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start mb-6">
                      <div className="flex items-start space-x-3 max-w-[80%]">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <div className="bg-card border border-border rounded-2xl px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Chat Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>

          {/* Data Permission Panel */}
          {sidebarVisible && (
            <div className="hidden xl:block">
              <DataPermissionPanel
                permissions={permissions}
                onTogglePermission={handleTogglePermission}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;