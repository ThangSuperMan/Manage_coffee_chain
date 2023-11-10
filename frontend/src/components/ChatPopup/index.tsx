import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { FaComment, FaTimes } from 'react-icons/fa';
import ActionCable from 'actioncable';
import { constants } from '@/constants';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatroom, setChatroom] = useState<any>({ id: '', name: 'Tu Van' });

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Implement your logic to send the message
    console.log('Sending message:', message);
    setMessage('');
  };

  const createSocket = () => {
    const consumer = ActionCable.createConsumer('ws://localhost:3000/cable');
    console.log('consumer: ', consumer);
    const subscription = consumer.subscriptions.create({
      channel: 'ChatChannel',
      room: chatroom.name,
    });
  };

  useEffect(() => {
    if (chatroom.name) {
      createSocket();
    }
  }, [chatroom.name, chatroom.id]);

  return (
    <Box position="fixed" bottom="20px" right="20px">
      {isOpen ? (
        <Box
          p={4}
          bg="white"
          width="300px"
          height="400px"
          boxShadow="md"
          rounded="md"
          position="relative"
          overflow="hidden"
        >
          <IconButton
            icon={<FaTimes />}
            aria-label="Close"
            position="absolute"
            top="5px"
            right="5px"
            onClick={toggleChat}
          />
          <Text fontSize="lg" fontWeight="bold">
            Chat
          </Text>
          {/* Render chat messages here */}
          <Box height="300px" overflowY="auto">
            {/* Render chat messages */}
          </Box>
          <InputGroup>
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={handleInputChange}
              pr="4.5rem"
              rounded="full"
              borderColor="gray.300"
              _focus={{ borderColor: 'blue.400' }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleSendMessage}>
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      ) : (
        <IconButton icon={<FaComment color="#1877f2" />} aria-label="Open Chat" size="lg" onClick={toggleChat} />
      )}
    </Box>
  );
};

export default ChatPopup;
