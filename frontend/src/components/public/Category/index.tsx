import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { Box, Text, List, ListItem, useDisclosure, Collapse } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { addCurrentActiveChildCategory } from '@/redux/Features/ChildCategory/childCategorySlice';
import { httpMethods } from '@/constants';

interface Category {
  attributes: {
    name: string;
    slug: string;
  };
}

interface Subcategory {
  name: string;
  slug: string;
  meta_title: string;
}

interface CategoryLink {
  name: string;
  slug: string;
  index: number;
  subcategories?: any;
}

interface SubcategoryActive {
  name: string;
  slug: string;
}

const CategoryLink: React.FC<CategoryLink> = (props) => {
  // const currentActiveChildCategory = useSelector((state: RootState) => state.childCategory.value);
  const { name, slug, subcategories } = props;
  const [isClickedExpandCategory, setIsClickedExpandCategory] = useState<boolean>(false);
  const [currentActiveChildCategory, setCurrentActiveChildCategory] = useState<string | null>('');
  const dispath = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const isActive: boolean = pathname.endsWith(slug);

  const handleClickChildCategory = (event: any) => {
    const { currentTarget: categoryEl } = event;
    const currentActiveSubcategoryText = categoryEl.children[0].textContent;
    setCurrentActiveChildCategory(currentActiveSubcategoryText);
    dispath(addCurrentActiveChildCategory(currentActiveSubcategoryText));
  };

  const handleExpandChildCategories = (event: any) => {
    const categoryEl = event.target;
    const currentActiveCategoryText = categoryEl.textContent;
    dispath(addCurrentActiveChildCategory(currentActiveCategoryText));
    setIsClickedExpandCategory(true);
  };

  return (
    <li style={{ listStyle: 'none' }}>
      <Link onClick={handleExpandChildCategories} href={`/collections/${slug}`}>
        <Text fontSize="sm" color={isActive ? 'primary' : 'gray.600'} fontWeight={isActive ? 'bold' : undefined}>
          {name}
        </Text>
      </Link>
      <Box>
        <Collapse in={isClickedExpandCategory} animateOpacity>
          <ul>
            {subcategories?.map((subcategory: Subcategory, index: number) => (
              <li key={index}>
                <Link onClick={handleClickChildCategory} href={`/collections/${subcategory.slug}`}>
                  <Text
                    marginLeft="2"
                    fontSize="sm"
                    color={subcategory.name === currentActiveChildCategory ? 'primary' : 'gray.600'}
                  >
                    {subcategory.name}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
        </Collapse>
      </Box>
    </li>
  );
};

const Category: React.FC = () => {
  const { response, loading, error } = useAxios({
    method: httpMethods.GET,
    url: '/api/v1/category',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });
  const [categories, setCategories] = useState<Category[]>();
  const [subcategories, setSubcategories] = useState<Subcategory[]>();

  const getChildCategories = (categories: Category[] | undefined): Subcategory[] => {
    const childCategories: Subcategory[] = [];
    categories?.forEach((category: any) => {
      const subcategories = category.relationships.subcategories.data;
      childCategories.push(subcategories);
    });

    return childCategories;
  };

  useEffect(() => {
    if (response) {
      const childCategories = getChildCategories(categories);
      setCategories(response.data.data);
      setSubcategories(childCategories);
    }
  }, [response, categories]);

  return (
    <Box
      width="234px"
      height="292px"
      paddingLeft="4"
      paddingRight="53px"
      borderRightWidth="2px"
      borderRightColor="gray.200"
    >
      <ul>
        <CategoryLink index={0} subcategories={subcategories} name="Tất cả" slug="all" />
        {categories?.map((category: Category, index: number) => (
          <CategoryLink
            key={index}
            index={index}
            name={category.attributes.name}
            slug={category.attributes.slug}
            subcategories={subcategories ? subcategories[index] : undefined}
          />
        ))}
      </ul>
    </Box>
  );
};

export default Category;
