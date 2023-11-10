'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const orders = [
  { id: 1, customer: 'John Doe', product: 'Product A', quantity: 2, status: 'pending' },
  { id: 2, customer: 'Jane Smith', product: 'Product B', quantity: 3, status: 'pending' },
  // Add more orders as needed
];

interface CreateOrderPopupProps {
  isCreatingOrder: boolean;
  setIsCreatingOrder: (value: boolean) => void;
  newOrder: {
    customer: string;
    product: string;
    quantity: number;
  };
  setNewOrder: (value: { customer: string; product: string; quantity: number; cashier_name: string }) => void;
  handleCreateOrder: () => void;
}

const CreateOrderPopup: React.FC<CreateOrderPopupProps> = ({
  isCreatingOrder,
  setIsCreatingOrder,
  newOrder,
  setNewOrder,
  handleCreateOrder,
}) => {
  return (
    <Modal isOpen={isCreatingOrder} onClose={() => setIsCreatingOrder(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tạo đơn hàng mới</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Khách hàng</FormLabel>
            <Input
              placeholder="Nhập tên khách hàng"
              value={newOrder.customer}
              onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Mã sản phẩm</FormLabel>
            <Input
              placeholder="Nhập mã sản phẩm"
              value={newOrder.product}
              onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Nhập tên nhân viên</FormLabel>
            <Input
              placeholder="Nhập tên nhân viên đảm nhiệm"
              value={newOrder.product}
              onChange={(e) => setNewOrder({ ...newOrder, cashier_name: e.target.value })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Số lượng</FormLabel>
            <Input
              type="number"
              placeholder="Nhập số lượng"
              value={newOrder.quantity}
              onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreateOrder}>
            Tạo đơn hàng
          </Button>
          <Button onClick={() => setIsCreatingOrder(false)}>Thoát</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const AdminOrder = () => {
  const [isCreatingOrUpdateOrder, setIsCreatingOrUpdateOrder] = useState<boolean>(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState<boolean>(false);
  const [newOrder, setNewOrder] = useState({ customer: '', product: '', quantity: '', cashier_name: '' });
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const handleCreateOrder = () => {
    // Perform the necessary logic to create the new order
    console.log(newOrder);
    // Reset the form fields
    setNewOrder({
      customer: '',
      product: '',
      quantity: 0,
    });
    // Close the popup
    setIsCreatingOrder(false);
  };

  const handleEditOrder = (orderId) => {
    setIsUpdatingOrder(true);
  };

  const handleDeleteOrder = (orderId) => {
    console.log('handleDeleteOrder');
    setIsDeleteConfirmationOpen(true);
  };

  const handleUpdateOrder = () => {
    setIsUpdatingOrder(false);
    setNewOrder({ customer: '', product: '', quantity: '' });
    toast.success('🦄 cập nhật thành công!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const handleConfirmDelete = () => {
    toast.success('🦄 Xoá sản phẩm thành công!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setIsDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setProductToDelete(null);
  };

  return (
    <main>
      <Box p={4}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg">Quán lý đơn hàng</Heading>
        </Flex>
        <Button colorScheme="blue" onClick={() => setIsCreatingOrder(true)}>
          Create New Order
        </Button>
        <CreateOrderPopup
          isCreatingOrder={isCreatingOrder}
          setIsCreatingOrder={setIsCreatingOrder}
          newOrder={newOrder}
          setNewOrder={setNewOrder}
          handleCreateOrder={handleCreateOrder}
        />
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Mã ID</Th>
              <Th>Tên khách hàng</Th>
              <Th>Sản phẩm</Th>
              <Th>Số lượng</Th>
              <Th>Trạng thái</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.customer}</Td>
                <Td>{order.product}</Td>
                <Td>{order.quantity}</Td>
                <Td>{order.status}</Td>
                <Td>
                  <IconButton
                    onClick={handleEditOrder}
                    icon={<FaEdit />}
                    colorScheme="blue"
                    variant="ghost"
                    mr={2}
                    aria-label="Edit"
                  />
                  <IconButton
                    onClick={handleDeleteOrder}
                    icon={<FaTrash />}
                    colorScheme="red"
                    variant="ghost"
                    aria-label="Delete"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal isOpen={isUpdatingOrder} onClose={() => setIsUpdatingOrder(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cập nhật đơn</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Khách hàng</FormLabel>
              <Input
                placeholder="Nhập tên khách hàng"
                value={newOrder.customer}
                onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Product</FormLabel>
              <Input
                placeholder="Nhập tên sản phẩm"
                value={newOrder.product}
                onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                placeholder="Nhập số lượng"
                value={newOrder.quantity}
                onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateOrder}>
              Lưu
            </Button>
            <Button onClick={() => setIsUpdatingOrder(false)}>Thoát</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isDeleteConfirmationOpen && (
        <AlertDialog isOpen={isDeleteConfirmationOpen} leastDestructiveRef={undefined} onClose={handleCancelDelete}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Xóa sản phẩm
              </AlertDialogHeader>
              <AlertDialogBody>Bạn có chắc chắn muốn xóa sản phẩm này?</AlertDialogBody>
              <AlertDialogFooter>
                <Button colorScheme="red" onClick={handleConfirmDelete}>
                  Xóa
                </Button>
                <Button ml={3} onClick={handleCancelDelete}>
                  Thoát
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </main>
  );
};

export default AdminOrder;
