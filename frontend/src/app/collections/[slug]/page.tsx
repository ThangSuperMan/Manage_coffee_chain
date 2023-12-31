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
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { httpMethods } from '@/constants';
import { constants } from '@/constants';
import { getLocalStorageItem } from '@/shared/localStorageHelper';
import { notififyError, notifySuccess } from '@/shared/toastNotificationHelper';

interface Props {}

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

  const handleAddToFavorites = async (e: any) => {
    console.log('handleAddToFavorites');
    try {
      const productFavorite: ProductFavorite = {
        product: {
          slug: slug,
        },
      };

      const response = await axios.post(`${constants.baseURL}/api/v1/favorite_products`, productFavorite, {
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
      // const toastMessage: string = error.response.data.error[0];
      // notififyError(toastMessage);
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
          icon={<FaHeart color={isFavorite ? 'red' : 'gray'} />}
          onClick={handleAddToFavorites}
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
    url: getUrlBasedOnLevelOfCategory(slug),
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });

  function getUrlBasedOnLevelOfCategory(slug: string) {
    const isParentCategory: boolean = categories.some((category: any) => category.slug === slug);
    if (!isParentCategory && slug === 'all') {
      return '/api/v1/products';
    }

    return isParentCategory ? `/api/v1/categories/${slug}/products` : `/api/v1/subcategories/${slug}/products`;
  }

  useEffect(() => {
    if (response) {
      const products = response.data?.data;
      setProducts(products);
    }
  }, [response, products]);

  return products?.map((item: any, index: number) => {
    const product = item.attributes;
    return <ProductItem key={index} product={product} />;
  });
};

const ProductsPage: React.FC<Props> = () => {
  const currentActiveChildCategory = useSelector((state: RootState) => state.childCategory.value);
  const pathname = usePathname();
  const slug = pathname.split('/')[LAST_PATH_SEGMENT_INDEX];
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: `/api/v1/categories/${slug}/products`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });

  const getCategoryNameBasedOnSlug = (slug: string): string => {
    categories.forEach((category: any) => {
      if (category.slug === slug) {
        const result = category.name;

        return result;
      }
    });

    const firstCategory = categories[0].slug;
    return firstCategory;
  };

  return (
    <>
      <Box width="full" paddingLeft="72px" paddingRight="15px">
        <Heading as="h3" display="inline-block" paddingLeft="15px" marginBottom="6" fontSize="2xl">
          {currentActiveChildCategory}
        </Heading>
        <Flex width="full" flexWrap="wrap">
          {loading && (
            <Center width="100vh" height="80vh">
              <Spinner thickness="4px" speed="0.8s" emptyColor="gray.200" color="blue.500" size="xl" />
            </Center>
          )}
          {!loading && <CollectionsContainer />}
        </Flex>
      </Box>
      <ChatPopup />
    </>
  );
};

export default ProductsPage;
