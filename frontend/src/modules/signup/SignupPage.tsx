'use client';

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
import React from 'react';

interface Props {}

const SignUpPage: React.FC<Props> = () => {
  const verbose = () => {
    alert("Hello World!");
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" py={12} px={6}>
        <Stack spacing={8} w="lg">
          <Heading fontSize="4xl" textAlign="center">
            Sign up
          </Heading>
        </Stack>
        <Box>
          <input onClick={verbose} type='text' placeholder='Fill me up' />
        </Box>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.7000')} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Your email</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Your password</FormLabel>
              <Input type="password" />
            </FormControl>
            <FormControl id="confirm_password" isRequired>
              <FormLabel>Your confirm password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{ base: 'column', sm: 'row' }} align="start" justify="space-between">
                <Checkbox>Remember me</Checkbox>
                <Link href="/forgot_password">
                  <Text color="blue.400">Forgot password?</Text>
                </Link>
              </Stack>
              <Button bg="blue.400" color="white" _hover={{ bg: 'blue.500' }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUpPage;
