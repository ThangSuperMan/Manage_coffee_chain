'use client';

import React, { useState, useEffect } from 'react';
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
  Tag,
  Select,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { constants, httpMethods } from '@/constants';
import { toast } from 'react-toastify';
import { getLocalStorageItem } from '@/shared/localStorageHelper';
import axios from 'axios';
import { notififyError, notifySuccess } from '@/shared/toastNotificationHelper';
import { Order } from '@/types/order';
import useAxios from '@/hooks/useAxios';
import { OrderStatus } from '@/types/orderStatus';

interface CreateOrderPopupProps {
  isCreatingOrder: boolean;
  setIsCreatingOrder: (value: boolean) => void;
  newOrder: Order;
  setNewOrder: (value: Order) => void;
  handleCreateOrder: () => void;
}

interface OrderStatusDropdown {
  selectedStatus: number;
  onChange: (value: number) => void;
}

const OrderStatusDropdown = ({ selectedStatus, onChange }: OrderStatusDropdown) => {
  const handleStatusChange = (event: any) => {
    console.log('handleStatusChange');
    const selectedValue = parseInt(event.target.value); // Convert the value to a number
    onChange(selectedValue);
  };

  return (
    <Select value={selectedStatus} onChange={handleStatusChange}>
      <option value={0}>Pending</option>
      <option value={1}>Completed</option>
      <option value={2}>Returned</option>
    </Select>
  );
};

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
        <form>
          <ModalHeader>Tạo đơn hàng mới</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Mã sản phẩm</FormLabel>
              <Input
                placeholder="Mã sản phẩm"
                value={newOrder.product_id}
                type="number"
                onChange={(e) => setNewOrder({ ...newOrder, product_id: parseInt(e.target.value) })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Khách hàng</FormLabel>
              <Input
                placeholder="Nhập email khách hàng"
                value={newOrder.email}
                onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Nhập tên nhân viên</FormLabel>
              <Input
                placeholder="Nhập tên nhân viên đảm nhiệm"
                value={newOrder.cashier_name}
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
            <Button type="submit" onClick={() => setIsCreatingOrder(false)}>
              Thoát
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

const AdminOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCreatingOrUpdateOrder, setIsCreatingOrUpdateOrder] = useState<boolean>(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState<boolean>(false);
  const [currentEditingOrder, setCurrentEditingOrder] = useState<Order>({});
  const [currentDeletingOrder, setCurrentDeletingOrder] = useState<Order>({});
  const [selectedIndexStatus, setSelectedIndexStatus] = useState<number>(0);
  const [newOrder, setNewOrder] = useState<Order>({});
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState<boolean>(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const { response, loading, error } = useAxios({
    method: httpMethods.GET,
    url: `${constants.baseURL}/api/v1/orders`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLocalStorageItem('access_token')}`,
    },
    body: null,
  });

  const handleStatusChange = (selectedIndex: number) => {
    console.log('handleStatusChange');
    console.log('selectedIndex: ', selectedIndex);
    setCurrentEditingOrder((prev) => ({ ...prev, status: selectedIndex }));
    setSelectedIndexStatus(selectedIndex);
  };

  const handleCreateOrder = async () => {
    try {
      const response: any = await axios.post(`${constants.baseURL}/api/v1/orders`, newOrder, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getLocalStorageItem('access_token')}`,
        },
      });

      notifySuccess('Tạo đơn hàng thành công');
    } catch (error: any) {
      console.log('error: ', error);
      notififyError('Tạo đơn hàng thất bại');
    }

    // Close the popup
    setIsCreatingOrder(false);
  };

  const loadOrderNeedToBeModified = (orderId: any) => orders.find((order) => order.id === orderId);

  const handleEditOrder = (orderId: any) => {
    const order = loadOrderNeedToBeModified(orderId);
    if (order) {
      setCurrentEditingOrder(order);
    }

    setIsUpdatingOrder(true);
  };

  const handleDeleteOrder = (orderId: any) => {
    const order = loadOrderNeedToBeModified(orderId);
    if (order) {
      setCurrentDeletingOrder(order);
    }

    setIsDeleteConfirmationOpen(true);
  };

  const handleUpdateOrder = async () => {
    console.log('currentEditingOrder: ', currentEditingOrder);
    try {
      const response = await axios.put(
        `${constants.baseURL}/api/v1/orders/${currentEditingOrder.id}`,
        currentEditingOrder,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getLocalStorageItem('access_token')}`,
          },
        },
      );

      setIsUpdatingOrder(false);
      console.log('response: ', response);
      notifySuccess(response.data.message);
    } catch (error: any) {
      notififyError('🦄 cập nhật thất bại!');
    }
  };

  const handleConfirmDelete = () => {
    try {
      const response = axios.delete(`${constants.baseURL}/api/v1/orders/${currentDeletingOrder.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getLocalStorageItem('access_token')}`,
        },
      });

      notifySuccess('Xóa đơn hàng thành công!');
    } catch (error: any) {
      console.log('error: ', error);
      notififyError('Xóa đơn hàng thất bại!');
    }

    setIsDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  useEffect(() => {
    if (response) {
      console.log('response: ', response);
      console.log('currentEditingOrder: ', currentEditingOrder);
      console.log('selectedIndexStatus: ', selectedIndexStatus);
      const ordersData: any[] = [];
      response.data.data.forEach((order: any) => {
        const orderData: Order = {
          id: order.id,
          product_id: order.attributes.product_id,
          quantity: order.attributes.quantity,
          cashier_name: order.attributes.cashier_name,
          status: OrderStatus[order.attributes.status] || order.attributes.status,
          email: order.relationships.user.data,
        };
        ordersData.push(orderData);
      });
      setOrders(ordersData);
    }
  }, [response, currentEditingOrder, selectedIndexStatus]);

  return (
    <main>
      <Box p={4}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg">Quán lý đơn hàng</Heading>
        </Flex>
        <Button colorScheme="blue" onClick={() => setIsCreatingOrder(true)}>
          Tạo mới đơn hàng
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
              <Th>Email khách hàng</Th>
              <Th>Mã Sản phẩm</Th>
              <Th>Nhân viên phụ trách</Th>
              <Th>Số lượng</Th>
              <Th>Trạng thái</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.email}</Td>
                <Td>{order.product_id}</Td>
                <Td>{order.cashier_name}</Td>
                <Td>{order.quantity}</Td>
                <Td>
                  <Tag size="md" variant="solid" colorScheme="blue">
                    {order.status}
                  </Tag>
                </Td>
                <Td>
                  <IconButton
                    onClick={() => handleEditOrder(order.id)}
                    icon={<FaEdit />}
                    colorScheme="blue"
                    variant="ghost"
                    mr={2}
                    aria-label="Edit"
                  />
                  <IconButton
                    onClick={() => handleDeleteOrder(order.id)}
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
                placeholder="Nhập email khách hàng"
                value={currentEditingOrder.email}
                onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Số lượng</FormLabel>
              <Input
                type="number"
                placeholder="Nhập số lượng"
                value={currentEditingOrder.quantity}
                onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Trạng thái</FormLabel>
              <OrderStatusDropdown selectedStatus={selectedIndexStatus} onChange={handleStatusChange} />
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
