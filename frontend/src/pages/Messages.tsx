import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  MessageSquare, 
  Send,
  Search,
  User,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react';

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      lastMessage: 'Thank you for the appointment yesterday',
      time: '2 min ago',
      unread: true,
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Michael Chen',
      lastMessage: 'Can I reschedule my appointment?',
      time: '1 hour ago',
      unread: false,
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emily Davis',
      lastMessage: 'I have a question about my prescription',
      time: '3 hours ago',
      unread: false,
      avatar: 'ED'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      message: 'Thank you for the appointment yesterday',
      time: '2:30 PM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      message: 'You\'re welcome! How are you feeling today?',
      time: '2:32 PM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Sarah Johnson',
      message: 'Much better, thank you for asking',
      time: '2:35 PM',
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  return (
    <div className="p-8">
      <div className="flex h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedMessage === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => setSelectedMessage(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{conversation.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${conversation.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                        {conversation.name}
                      </p>
                      <p className="text-xs text-gray-500">{conversation.time}</p>
                    </div>
                    <p className={`text-sm truncate ${conversation.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 flex flex-col">
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {conversations.find(c => c.id === selectedMessage)?.avatar}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {conversations.find(c => c.id === selectedMessage)?.name}
                    </h3>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{message.time}</span>
                        {message.isOwn && <CheckCheck className="h-3 w-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages; 