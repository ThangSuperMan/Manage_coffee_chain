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
import { Field, Formik } from 'formik';
import Link from 'next/link';
import axios from 'axios';
import { constants } from '@/constants';
import { setLocalStorageItem } from '@/shared/localStorageHelper';
import Account from '@/types/account';
import { notifySuccess, notififyError } from '@/shared/toastNotificationHelper';

const SignUpPage: React.FC = () => {
  const handleSubmitForm = async (values: any) => {
    const account: Account = {
      email: values.email,
      password: values.password,
      client_id: process.env.CLIENT_ID || '',
    };

    try {
      const response = await axios.post(`${constants.baseURL}/api/v1/user`, account, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('response: ', response);
      const user: any = response.data.user;

      const accessToken: string = user.access_token;
      console.log('accessToken: ', accessToken);
      setLocalStorageItem('access_token', accessToken);

      const toastMessage: string = 'Tạo tài khoảng thành công';
      notifySuccess(toastMessage);

      setInterval(() => {
        window.location.href = '/collections/ca-phe';
      }, 2000);
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
              Đăng ký
            </Heading>
          </Stack>
          <Box rounded="lg" bg={useColorModeValue('white', 'gray.7000')} boxShadow="lg" p={8}>
            <Stack spacing={4}>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  confirm_password: '',
                }}
                onSubmit={handleSubmitForm}
              >
                {({ handleSubmit, errors, touched, getFieldProps }) => {
                  const isInValidPassword: any = errors.password && touched.password;
                  const isInValidConfirmPassword: any = errors.confirm_password && touched.confirm_password;

                  return (
                    <form onSubmit={handleSubmit}>
                      <FormControl marginBottom="4" id="email" isRequired>
                        <FormLabel htmlFor="email">Địa chỉ email</FormLabel>
                        <Field as={Input} id="email" name="email" type="email" variant="filled" />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={isInValidPassword} isRequired>
                        <FormLabel>Mật khẩu</FormLabel>
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type="password"
                          variant="filled"
                          validate={(value: any) => {
                            const isHasError: boolean = value.length < 6;

                            return isHasError ? 'Mật khẩu phải có ít nhất 6 ký tự' : undefined;
                          }}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={isInValidConfirmPassword} isRequired>
                        <FormLabel>Xác nhận mật khẩu</FormLabel>
                        <Field
                          as={Input}
                          id="confirm_password"
                          name="confirm_password"
                          type="password"
                          variant="filled"
                          validate={(value: any) => {
                            const isHasError: boolean = value !== getFieldProps('password').value;

                            return isHasError ? 'Mật khẩu không giống nhau' : undefined;
                          }}
                        />
                        <FormErrorMessage>{errors.confirm_password}</FormErrorMessage>
                      </FormControl>
                      <Stack spacing={10}>
                        <Stack direction={{ base: 'column', sm: 'row' }} align="start" justify="space-between">
                          <Checkbox>Lưu thông tin</Checkbox>
                          <Link href="/forgot_password">
                            <Text color="blue.400">Quên mật khẩu?</Text>
                          </Link>
                        </Stack>
                        <Button type="submit" bg="blue.400" color="white" _hover={{ bg: 'blue.500' }}>
                          Đăng ký
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

export default SignUpPage;
