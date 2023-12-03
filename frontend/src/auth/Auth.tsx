import React from 'react';
import AuthNavbar from '@/auth/navbar/AuthNavbar';
import AuthFooter from '@/auth/footer/AuthFooter';
import { Box } from '@chakra-ui/react';

const Auth: React.FC = () => {
  return (
    <Box>
      <AuthNavbar />
      <AuthFooter />
    </Box>
  );
};

export default Auth;
