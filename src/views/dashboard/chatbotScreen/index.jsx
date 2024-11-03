import React, { useState } from 'react';
import axios from 'axios';
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Toolbar,
  Avatar,
  Typography,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (messageText) => {
    const newMessage = {
      message: messageText,
      sender: 'user',
      direction: 'outgoing',
      position: 'normal',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await axios.post('https://bu-fos-mastermind.solutions-apps.com/ai/chatbot', {
        message: messageText,
      });

      const botResponse = {
        message: response.data.reply,
        sender: 'bot',
        direction: 'incoming',
        position: 'normal',
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        message: 'Error sending message, please try again.',
        sender: 'bot',
        direction: 'incoming',
        position: 'normal',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%', backgroundColor: '#f7f9fc', padding: '20px' }}>
      <ChatContainer>
        <Toolbar>
          <Typography variant="h6">Admin Dashboard Chatbot</Typography>
        </Toolbar>
        <MessageList>
          {messages.map((message, index) => (
            <Message key={index} model={message}>
              <Avatar
                src={message.sender === 'user' ? '/user-avatar.png' : '/bot-avatar.png'}
                name={message.sender === 'user' ? 'User' : 'Bot'}
              />
              <Typography>{message.message}</Typography>
            </Message>
          ))}
        </MessageList>
        <MessageInput
          placeholder="Type a message..."
          onSend={(text) => handleSendMessage(text)}
        />
      </ChatContainer>
    </div>
  );
};

export default ChatbotScreen;
