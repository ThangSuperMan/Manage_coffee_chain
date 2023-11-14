'use client';

import React from 'react';
import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Checkbox,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Formik, useFormik } from 'formik';
import Link from 'next/link';
import { constants } from '@/constants';
import axios from 'axios';
import { setLocalStorageItem } from '@/shared/localStorageHelper';
import { notifySuccess, notififyError } from '@/shared/toastNotificationHelper';

interface EssentialCredentials {
  grant_type: string;
  email: string;
  password: string;
  client_id: string;
  client_secret: string;
}

const SignInPage: React.FC = () => {
  const handleSubmitForm = async (values: any) => {
    console.log('handleSubmitForm');
    const essentialSignInCredentials: EssentialCredentials = {
      grant_type: 'password',
      email: values.email,
      password: values.password,
      client_id: process.env.CLIENT_ID || '',
      client_secret: process.env.CLIENT_SECRET || '',
    };
    console.log('essentialSignInCredentials: ', essentialSignInCredentials);

    try {
      const response = await axios.post(`${constants.baseURL}/oauth/token`, essentialSignInCredentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('response: ', response);
      const accessToken = response.data.access_token;
      setLocalStorageItem('access_token', accessToken);

      notifySuccess('Đăng nhập thành công');
    } catch (error: any) {
      const toastMessage: string = error.response.data.error[0];
      notififyError(toastMessage);
    }
  };

  return (
    <main>
      <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx="auto" py={12} px={6}>
          <Stack spacing={8} w="lg">
            <Heading fontSize="4xl" textAlign="center">
              Đăng nhập
            </Heading>
          </Stack>
          <Box rounded="lg" bg={useColorModeValue('white', 'gray.7000')} boxShadow="lg" p={8}>
            <Stack spacing={4}>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={handleSubmitForm}
              >
                {({ handleSubmit, errors, touched }) => {
                  const isInValidPassword: boolean = errors.password ? true : false;

                  return (
                    <form onSubmit={handleSubmit}>
                      <FormControl marginBottom="4" id="email" isRequired>
                        <FormLabel htmlFor="email">Địa chỉ email</FormLabel>
                        <Field as={Input} id="email" name="email" type="email" variant="filled" />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={isInValidPassword && touched.password} isRequired>
                        <FormLabel>Mật khẩu</FormLabel>
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type="password"
                          variant="filled"
                          validate={(value: any) => {
                            const isHasError: boolean = value.length < 6;

                            return isHasError ? 'Password must be at least 6 characters' : undefined;
                          }}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <Stack spacing={10}>
                        <Stack direction={{ base: 'column', sm: 'row' }} align="start" justify="space-between">
                          <Checkbox>Lưu thông tin</Checkbox>
                          <Link href="/forgot_password">
                            <Text color="blue.400">Quên mật khẩu?</Text>
                          </Link>
                        </Stack>
                        <Button type="submit" bg="blue.400" color="white" _hover={{ bg: 'blue.500' }}>
                          Đăng nhập
                        </Button>
                      </Stack>
                    </form>
                  );
                }}
              </Formik>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </main>
  );
};

export default SignInPage;
