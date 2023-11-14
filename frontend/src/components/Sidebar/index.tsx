'use client';

import { useState } from 'react';
import { Box, Button, Flex, IconButton, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex>
      {isOpen && (
        <Box
          w="200px"
          h="100vh"
          bg="gray.200"
          p={4}
          boxShadow="md"
          transition="width 0.3s"
        >
          {/* Sidebar content */}
          <VStack spacing={4} align="start">
            {/* Sidebar items */}
            <Button variant="ghost">Item 1</Button>
            <Button variant="ghost">Item 2</Button>
            <Button variant="ghost">Item 3</Button>
          </VStack>
        </Box>
      )}
      <Box flex="1" p={4}>
        {/* Main content */}
        <IconButton
          icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          onClick={toggleSidebar}
          position="fixed"
          top="50%"
          transform="translateY(-50%)"
          right="0"
          zIndex="999"
          bg="gray.200"
          _hover={{ bg: 'gray.300' }}
        />
      </Box>
    </Flex>
  );
};

export default Sidebar;
