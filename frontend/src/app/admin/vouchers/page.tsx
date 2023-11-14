'use client';

import { useState } from 'react';
import { Box, Button, Heading, VStack, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

const VoucherPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [status, setStatus] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddVoucher = (e) => {
    e.preventDefault();
    if (editIndex !== -1) {
      const updatedVouchers = [...vouchers];
      updatedVouchers[editIndex] = { code, discount, status };
      setVouchers(updatedVouchers);
      setEditIndex(-1);
    } else {
      const newVoucher = { code, discount, status };
      setVouchers([...vouchers, newVoucher]);
    }
    setCode('');
    setDiscount('');
    setStatus('');
  };

  const handleEditVoucher = (index) => {
    const voucherToEdit = vouchers[index];
    setCode(voucherToEdit.code);
    setDiscount(voucherToEdit.discount);
    setStatus(voucherToEdit.status);
    setEditIndex(index);
  };

  const handleDeleteVoucher = (index) => {
    const updatedVouchers = [...vouchers];
    updatedVouchers.splice(index, 1);
    setVouchers(updatedVouchers);
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Quản lý Phiếu giảm giá</Heading>
      <form onSubmit={handleAddVoucher}>
        <VStack align="start" spacing={4}>
          <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="md">
            <Heading as="h2" size="md">{editIndex !== -1 ? 'Chỉnh sửa Phiếu giảm giá' : 'Thêm Phiếu giảm giá'}</Heading>
            <FormControl mt={4}>
              <FormLabel htmlFor="code">Mã Phiếu giảm giá</FormLabel>
              <Input id="code" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="discount">Giảm giá</FormLabel>
              <Input id="discount" type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="status">Trạng thái</FormLabel>
              <Input id="status" type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              {editIndex !== -1 ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Box>
          <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="md" w="100%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Mã Phiếu giảm giá</Th>
                  <Th>Giảm giá</Th>
                  <Th>Trạng thái</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {vouchers.map((voucher, index) => (
                  <Tr key={index}>
                    <Td>{voucher.code}</Td>
                    <Td>{voucher.discount}</Td>
                    <Td>{voucher.status}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="teal"
                        variant="ghost"
                        onClick={() => handleEditVoucher(index)}
                        mr={2}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDeleteVoucher(index)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </form>
    </Box>
  );
};

export default VoucherPage;
