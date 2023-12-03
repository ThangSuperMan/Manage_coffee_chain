'use client';

import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Heading, Image, Center, Spinner, IconButton } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import Product from '@/types/product';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import ChatPopup from '@/components/ChatPopup';
import { FaHeart, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { httpMethods } from '@/constants';
import { constants } from '@/constants';
import { getLocalStorageItem } from '@/shared/localStorageHelper';
import { notififyError, notifySuccess } from '@/shared/toastNotificationHelper';

const ProductFavorites: React.FC = () => {};

const LAST_PATH_SEGMENT_INDEX = 2;
const categories: { name?: string; slug: string }[] = [
  {
    name: 'Cà phê',
    slug: 'ca-phe',
  },
  {
    name: 'Cloud',
    slug: 'cloud',
  },
  {
    name: '',
    slug: 'tra-trai-cay-tra-sua',
  },
  {
    name: 'Hi-Tea Healthy',
    slug: 'hi-tea-healthy',
  },
  {
    name: 'banh',
    slug: 'banh',
  },
];

interface ProductFavorite {
  product: {
    slug: string;
  };
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
  const { title, price, image_url, slug } = props.product;
  const isFavorite: boolean = false;

  const handleRemoveFromFavorites = async () => {
    console.log('handleRemoveFromFavorites ');
    try {
      const response = await axios.delete(`${constants.baseURL}/api/v1/favorite_products/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getLocalStorageItem('access_token')}`,
        },
      });

      console.log('response: ', response);
      // const user: any = response.data.user;

      notifySuccess(response.data.message);
    } catch (error: any) {
      console.log('error :>> ', error);
    }
  };

  const handleAddToFavorites = async (e: any) => {
    console.log('handleAddToFavorites');
    try {
      const productFavorite: ProductFavorite = {
        product: {
          slug: slug,
        },
      };

      const response = await axios.get(`${constants.baseURL}/api/v1/favorite_products`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getLocalStorageItem('access_token')}`,
        },
      });

      console.log('response: ', response);
      const user: any = response.data.user;

      const toastMessage: string = 'Thêm sản phẩm vào danh dách yêu thích, thành công!';
      notifySuccess(toastMessage);
    } catch (error: any) {
      console.log('error :>> ', error);
    }
  };

  return (
    <Box width="33.33%" paddingX="15px" paddingBottom="10" className="product">
      <Box position="relative">
        <Link href={`/products/${slug}`}>
          <Image borderRadius="xl" boxShadow="lg" objectFit="cover" src={image_url} alt="logo" />
        </Link>
        <IconButton
          position="absolute"
          top="2"
          right="2"
          aria-label="Add to favorites"
          icon={<FaTrash color={isFavorite ? 'red' : 'gray'} />}
          onClick={handleRemoveFromFavorites}
          ml="2"
          size="sm"
        />
      </Box>
      <Box paddingTop="4">
        <Link href={`/products/${slug}`}>
          <Heading
            as="h3"
            display="inline-block"
            fontWeight="bold"
            fontSize="medium"
            marginBottom="1"
            className="product-title"
          >
            {title}
          </Heading>
        </Link>
        <Flex marginBottom="10px">
          <Text fontSize="sm" color="gray.500" className="product-price">
            {price}
          </Text>
          <Text fontSize="sm" color="gray.500">
            &nbsp;đ
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

const CollectionsContainer: React.FC = () => {
  const pathname = usePathname();
  const slug = pathname.split('/')[LAST_PATH_SEGMENT_INDEX];
  const [products, setProducts] = useState<Product[]>([]);
  const { response, loading, error } = useAxios({
    method: httpMethods.GET,
    url: `${constants.baseURL}/api/v1/favorite_products`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLocalStorageItem('access_token')}`,
    },
    body: null,
  });

  useEffect(() => {
    if (response) {
      console.log('response: ', response);
      const products = response.data?.data;
      setProducts(products);
    }
    console.log('products: ', products);
  }, [response, products]);

  return products?.map((item: any, index: number) => {
    const product = item.attributes;
    return <ProductItem key={index} product={product} />;
  });
};

const Wishlist: React.FC = () => {
  return (
    <>
      <Box width="full" paddingLeft="72px" paddingRight="15px">
        <Heading my="8" as="h1">
          Danh sách yêu thích
        </Heading>
        <Flex width="full" flexWrap="wrap">
          <CollectionsContainer />
        </Flex>
        <ChatPopup />
      </Box>
    </>
  );
};

export default Wishlist;
