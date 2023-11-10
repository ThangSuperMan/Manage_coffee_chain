'use client';
import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import BlogArticles from '@/components/public/BlogArticles';
import Category from '@/components/public/Category';
import { Box, Flex, Center, Text } from '@chakra-ui/react';
import QuillWrapper from '@/components/private/QuillWrapper';
import Product from '@/types/product';
import { httpMethods } from '@/constants';

const ColletionsPage: React.FC = () => {
  const [content, setContent] = useState();
  const { response, loading, error } = useAxios({
    method: httpMethods.GET,
    url: '/api/v1/products',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });
  const [products, setProducts] = useState<Product[]>([]);

  const handleOnChange = (value: string) => {};

  useEffect(() => {
    if (response) {
      setProducts(response);
    }
  }, [response]);

  return (
    <main>
      <Center marginTop="6">
        <Flex width="1200px"></Flex>
      </Center>
      <Box maxWidth="600px" height="400px">
        <QuillWrapper onChange={handleOnChange} theme="snow" />
      </Box>
    </main>
  );
};

export default ColletionsPage;
