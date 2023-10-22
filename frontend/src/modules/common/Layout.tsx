'use client';

import Sidebar from '@/components/Sidebar';
import { Box, useColorModeValue } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
  route?: string;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Box ml={{ base: 0, md: 60 }} minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
