'use client';

import { useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Input } from '@chakra-ui/react';

const ManageProductsPage: React.FC = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      image: 'https://example.com/product1.jpg',
      price: 10.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://example.com/product2.jpg',
      price: 19.99,
      description: 'Nulla facilisi. Sed euismod lectus id tellus tincidunt.',
    },
    {
      id: 3,
      name: 'Product 3',
      image: 'https://example.com/product3.jpg',
      price: 5.99,
      description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',
    },
  ]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: null,
  });

  const handleNameChange = (e) => {
    setNewProduct({ ...newProduct, name: e.target.value });
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const imageFile = e.dataTransfer.files[0];
    setNewProduct({ ...newProduct, image: imageFile });
  };

  const handleImageDragOver = (e) => {
    e.preventDefault();
  };

  const handleCreateProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct({ name: '', image: null });
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <Box p={4}>
      <Heading>Manage Products</Heading>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product, index) => (
            <Tr key={index}>
              <Td>{product.name}</Td>
              <Td>
                {product.image ? (
                  <img
                    src={URL.createObjectURL(product.image)}
                    alt="Product"
                    style={{ width: '50px', height: '50px' }}
                  />
                ) : (
                  'No Image'
                )}
              </Td>
              <Td>
                <Button colorScheme="red" size="sm" onClick={() => handleDeleteProduct(index)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={4}>
        <label htmlFor="name">Product Name:</label>
        <Input type="text" id="name" value={newProduct.name} onChange={handleNameChange} />
      </Box>
      <Box
        width="200px"
        height="200px"
        border="1px solid black"
        mt={4}
        onDrop={handleImageDrop}
        onDragOver={handleImageDragOver}
      >
        {newProduct.image ? (
          <img src={URL.createObjectURL(newProduct.image)} alt="Product" style={{ width: '100%', height: '100%' }} />
        ) : (
          <p>Drag and drop an image here</p>
        )}
      </Box>
      <Button mt={4} colorScheme="blue" onClick={handleCreateProduct}>
        Create Product
      </Button>
    </Box>
  );
};

export default ManageProductsPage;
