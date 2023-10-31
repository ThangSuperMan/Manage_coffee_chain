'use client';

import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { usePathname } from 'next/navigation';
import Product from '@/types/product';
import { Box, Spinner, Image, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { CoffeeIcon } from '@/components/Icons';

const LAST_PATH_SEGMENT_INDEX = 2;

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product>();
  const pathname = usePathname();
  const slug = pathname.split('/')[LAST_PATH_SEGMENT_INDEX];
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: `/api/v1/products/${slug}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });

  useEffect(() => {
    if (response) {
      setProduct(response.data.data.attributes);
    }
  }, [response]);

  return (
    <Center width="full" marginTop="20">
      <Box maxWidth="1200px">
        {loading && (
          <Center width="100vh" height="100vh">
            <Spinner thickness="4px" speed="0.8s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Center>
        )}
        <Flex>
          <Image
            width="570px"
            height="570px"
            borderRadius="xl"
            paddingX="15px"
            objectFit="cover"
            src={product?.image_url}
            alt="logo"
          />
          <Box width="570px" paddingX="15px">
            <Heading as="h3" fontSize="26px">
              {product?.title}
            </Heading>
            <Text color="primary" fontSize="26px" fontWeight="bold">
              {product?.price}
            </Text>
            <Text color="blackAlpha.800" marginTop="10" marginBottom="15px">
              Chọn size (bắt buộc)
            </Text>
            <Flex gap="4">
              <Flex
                paddingX="5"
                alignItems="center"
                height="10"
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
              >
                <CoffeeIcon width="12px" height="16px" />
                <Text marginLeft="5px" cursor="pointer">
                  Nhỏ + 0 đ
                </Text>
              </Flex>
              <Flex
                paddingX="5"
                alignItems="center"
                height="10"
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
              >
                <CoffeeIcon width="15px" height="20px" />
                <Text marginLeft="5px" cursor="pointer">
                  Vừa + 0 đ
                </Text>
              </Flex>
              <Flex
                paddingX="5"
                alignItems="center"
                height="10"
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
              >
                <CoffeeIcon width="19px" height="24px" />
                <Text marginLeft="5px" cursor="pointer">
                  Lớn + 0 đ
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};

export default ProductDetailPage;
