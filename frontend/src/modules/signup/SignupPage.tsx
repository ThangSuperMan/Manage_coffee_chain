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
} from '@chakra-ui/react';
import Link from 'next/link';

interface Props {}

const SignUpPage: React.FC<Props> = () => {
  const verbose = () => {
    alert('Hello World!');
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" py={12} px={6}>
        <Stack spacing={8} w="lg">
          <Heading fontSize="4xl" textAlign="center">
            Đăng ký
          </Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.7000')} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Địa chỉ email</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Mật khẩu</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl id="confirm_password" isRequired>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{ base: 'column', sm: 'row' }} align="start" justify="space-between">
                <Checkbox>Lưu thông tin</Checkbox>
                <Link href="/forgot_password">
                  <Text color="blue.400">Quên mật khẩu?</Text>
                </Link>
              </Stack>
              <Button bg="blue.400" color="white" _hover={{ bg: 'blue.500' }}>
                Đăng nhập
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUpPage;
