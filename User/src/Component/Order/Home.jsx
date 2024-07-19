import React from 'react';
import { Table, Button, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

const orders = [
  {
    customer: 'Janson',
    orderNumber: '227782277621422',
    date: '08 Feb 2023, 23:09 WIB',
    status:'Pending',
    total_amount:'2000000',
    action:'',
    products: [
      {
        name: 'STANDOUT BACKPACK',
        price: 'Rp50.000',
        status: 'Being processed',
        shippingLimit: '4 more days',
        deliveryService: 'Regular',
        notes: 'the color should not be red but blue',
      },
      {
        name: 'MINT EMBROIDERED',
        price: 'Rp50.000',
        status: 'Being processed',
        shippingLimit: '4 more days',
        deliveryService: 'Regular',
        notes: 'the color should not be red but blue',
      },
      {
        name: 'XVT LUX FITTED BATTING',
        price: 'Rp50.000',
        status: 'Being processed',
        shippingLimit: '4 more days',
        deliveryService: 'Regular',
        notes: 'the color should not be red but blue',
      },
    ],
  },
  {
    customer: 'Janson',
    orderNumber: '227782277621422',
    date: '08 Feb 2023, 23:09 WIB',
    status:'Pending',
    total_amount:'2000000',
    action:'',
    products: [
      {
        name: 'STANDOUT BACKPACK',
        price: 'Rp50.000',
        status: 'Being processed',
        shippingLimit: '4 more days',
        deliveryService: 'Regular',
        notes: 'the color should not be red but blue',
      },
      {
        name: 'MINT EMBROIDERED',
        price: 'Rp50.000',
        status: 'Being processed',
        shippingLimit: '4 more days',
        deliveryService: 'Regular',
        notes: 'the color should not be red but blue',
      },
      {
        name: 'XVT LUX FITTED BATTING',
        price: 'Rp50.000',
        status: 'Being processed',
        shippingLimit: '4 more days',
        deliveryService: 'Regular',
        notes: 'the color should not be red but blue',
      },
    ],
  },
];

const OrderTable = () => {
  return (
    <Table aria-label="Order Table" css={{ width: '100%', overflowX: 'auto' }}>
      <TableHeader className='flex w-full '>
        <TableColumn colSpan={6} className='m-auto flex flex-row w-[95%] items-center justify-around bg-slate-200'>
            <div>Product</div>
            <div>Total Payment</div>
            <div>Status</div>
            <div>Shipping limit</div>
            <div>Delivery Services</div>
            <div>Action</div>
        </TableColumn>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow key={index} className=''>
            <TableCell colSpan={6} className=' w-full'>
              <Table
                classNames={{
        table: "border-[2px] w-full  border-slate-300 rounded-lg",
        thead: "rounded-t-lg border-dashed border-b-[3px] border-slate-400",
        tbody: "rounded-b-lg",

        td: "border-b-[2px] border-slate-200 p-3",
      }}
                aria-label="Products Table"
                css={{ marginTop: '10px', width: '100%' }}
              >
                <TableHeader>
                  <TableColumn>
                    <div>
                Customer: {order.customer} / {order.date}
              </div>
                  </TableColumn>
                  <TableColumn></TableColumn>
                  <TableColumn></TableColumn>
                  <TableColumn></TableColumn>
                  <TableColumn></TableColumn>
                  <TableColumn></TableColumn>
                  <TableColumn className='font-mono text-md'>No ,Order:12</TableColumn>
                </TableHeader>
                <TableBody>
                  {order.products.map((product, prodIndex) => (
                    <TableRow key={prodIndex}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.status}</TableCell>
                      <TableCell>{product.shippingLimit}</TableCell>
                      <TableCell>{product.deliveryService}</TableCell>
                      <TableCell>{product.notes}</TableCell>
                      <TableCell>
                        <Button size="small">Print Label</Button>
                        <Button size="small" color="error">
                          Cancel Order
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;


