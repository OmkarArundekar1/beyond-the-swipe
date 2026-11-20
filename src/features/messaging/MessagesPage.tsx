import { useState } from 'react';
import { Send, MessageCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { mockMatches, mockMessages } from '@/lib/mockData';
import { formatTime } from '@/lib/utils';
import { DEV_MODE } from '@/lib/constants';

export function MessagesPage() {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(
    mockMatches.length > 0 ? mockMatches[0].id : null
  );
  const [messageText, setMessageText] = useState('');

  const selectedMatch = mockMatches.find((m) => m.id === selectedMatchId);
  const messages = mockMessages.filter((m) => m.matchId === selectedMatchId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    // In production, this would send to the backend
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  if (mockMatches.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        
        {DEV_MODE && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              Sample conversation for demonstration. Real-time messaging will be implemented with Supabase.
            </p>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conversation List */}
        <Card variant="bordered" className="lg:col-span-1 p-0 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Conversations</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {mockMatches.map((match) => {
              const otherProfile = match.profiles[1];
              const isSelected = selectedMatchId === match.id;
              
              return (
                <button
                  key={match.id}
                  onClick={() => setSelectedMatchId(match.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    isSelected ? 'bg-accent-50' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={otherProfile.photos[0]?.url}
                      alt={otherProfile.firstName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {otherProfile.firstName}
                        </h3>
                        {match.lastMessageAt && (
                          <span className="text-xs text-gray-500">
                            {formatTime(match.lastMessageAt)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        Click to view conversation
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Message Thread */}
        <Card variant="bordered" className="lg:col-span-2 p-0 flex flex-col h-[600px]">
          {selectedMatch ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedMatch.profiles[1].photos[0]?.url}
                    alt={selectedMatch.profiles[1].firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {selectedMatch.profiles[1].firstName}, {selectedMatch.profiles[1].age}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedMatch.compatibility?.overall}% compatible
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => {
                  const isSent = message.senderId === 'current-user';
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          isSent
                            ? 'bg-accent-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isSent ? 'text-accent-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!messageText.trim()}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <Card variant="bordered" className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          No conversations yet
        </h3>
        <p className="text-gray-600 mb-6">
          Match with someone to start a conversation!
        </p>
        <Button variant="primary">Start Discovering</Button>
      </div>
    </Card>
  );
}
