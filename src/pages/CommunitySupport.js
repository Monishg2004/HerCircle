// CommunitySupport.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CommunitySupport = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        setIsLoading(true);
        const userMessage = { role: 'user', content: inputMessage };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'Sorry, I encountered an error. Please try again.' 
            }]);
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-gradient-to-br from-pink-100 to-purple-100 min-h-screen p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">AI Health Assistant</h1>
                
                <div className="h-[500px] overflow-y-auto mb-4 p-4 border rounded-lg">
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-4 ${
                                message.role === 'user' ? 'text-right' : 'text-left'
                            }`}
                        >
                            <div
                                className={`inline-block p-3 rounded-lg ${
                                    message.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                {message.content}
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <div className="text-center text-gray-500">
                            Thinking...
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask any health-related question..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunitySupport;