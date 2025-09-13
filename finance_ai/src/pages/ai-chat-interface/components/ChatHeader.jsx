import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PermissionStatusIndicator from '../../../components/ui/PermissionStatusIndicator';

const ChatHeader = ({ onClearChat, onToggleSidebar, sidebarVisible, messageCount }) => {
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Bot" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">FinanceAI Assistant</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-muted-foreground">Online & Ready</span>
              </div>
            </div>
          </div>
          
          <PermissionStatusIndicator permissionLevel="partial" />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Message Count */}
          {messageCount > 0 && (
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-full">
              <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {messageCount} message{messageCount !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Toggle Sidebar */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="hidden lg:flex"
            title={sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
          >
            <Icon name={sidebarVisible ? "PanelRightClose" : "PanelRightOpen"} size={20} />
          </Button>

          {/* Clear Chat */}
          {messageCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearChat}
              iconName="Trash2"
              className="text-muted-foreground hover:text-error"
            >
              <span className="hidden sm:inline">Clear</span>
            </Button>
          )}

          {/* Settings */}
          <Link to="/privacy-permissions">
            <Button variant="ghost" size="icon" title="Privacy Settings">
              <Icon name="Settings" size={20} />
            </Button>
          </Link>
        </div>
      </div>
      {/* Session Info */}
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>End-to-end encrypted</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>Session started: {new Date()?.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Icon name="Zap" size={12} />
          <span>Powered by AI</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;