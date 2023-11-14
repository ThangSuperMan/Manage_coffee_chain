'use client';

import React from 'react';
import Providers from '@/redux/provider';
import { Box, Center, ChakraProvider, Flex, extendTheme } from '@chakra-ui/react';
import UserLayout from '@/common/layouts/user';
import 'react-quill/dist/quill.snow.css';
import Category from '@/components/public/Category';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/components/Sidebar';

const theme = extendTheme({
  colors: {
    primary: '#EA8025',
  },
});
const HOME_PAGE_ROUTE_LENGTH = 2;

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const pathsToCheck = ['/signin', '/signup'];
  const isSignUpOrSigInPage: boolean = pathsToCheck.some((path: string) => pathname.includes(path));
  const isProductsPage: boolean = pathname.includes('/collections');
  const isDetailProductPage: boolean = pathname.includes('products');
  const isAdminPage: boolean = pathname.includes('/admin');
  const isHomePage: boolean = pathname.split('/').length === HOME_PAGE_ROUTE_LENGTH;

  return (
    <html lang="en">
      <head />
      <body>
        <ChakraProvider theme={theme}>
          {isProductsPage && (
            <Providers>
              <UserLayout>
                <main>
                  <Center marginBottom="200px">
                    <Flex width="1200px" marginY="10">
                      <Category />
                      {children}
                    </Flex>
                  </Center>
                </main>
              </UserLayout>
            </Providers>
          )}
          {isDetailProductPage && (
            <Providers>
              <UserLayout>{children}</UserLayout>
            </Providers>
          )}
          {isHomePage && (
            <Providers>
              <UserLayout>{children}</UserLayout>
            </Providers>
          )}
          {isAdminPage && (
            <Providers>
              <UserLayout>{children}</UserLayout>
            </Providers>
          )}
          {isSignUpOrSigInPage && <Providers>{children}</Providers>}
          <ToastContainer />
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
