import React, { useState } from "react";
import {
  Table,
  Button,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { infor, Product } from "../Redux/Selector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { OrderChangeStatus } from "../Redux/AccountSlice";
const statusColorMap = {
  Prepare: "#f8f483",
  Pending: "#646cff",
  Shipping: "#0bd4ed",
  Completed: "#59fbd6",
  Cancel: "#f9556b",
};
const statusContentMap = {
  Prepare: "Chờ Thanh Toán",
  Pending: "Đang Chuẩn bị",
  Shipping: "Đang Giao Hàng",
  Completed: "Hoàn Thành",
  Cancel: "Đã Hủy",
};
const OrderTable = ({ filter }) => {
  const dispatch=useDispatch()
  const Infor = useSelector(infor);
  const [page, setpage] = useState(1);

  const product = useSelector(Product);
  const order = Infor.orders.map((el) => ({
    id: el.orders_id,
    customer: Infor.username,
    orderNumber: Infor.phoneNumber,
    date: el.created_at,
    status: el.status,
    total_amount: el.total_amount,
    action: "",
    address: el.addressorder,
    products: el.orderItems.map((item) => ({
      name: item.product_name,
      price: item.product_price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      image: product.find((el1) => el1.product_id == item.productID)
        .imagesMap[0].image_urlString,
    })),
  })).filter((el) => el.status.includes(filter));
  const pages = Math.ceil(order.length / 2);
  console.log(order);
  return (
    <Table
      className="bg-white rounded-lg shadow-lg border-[2px] border-slate-200"
      aria-label="Order Table"
      bottomContent={
        <Pagination
          showControls
          classNames={{
            cursor: "bg-[#6542fd] shadow-inner text-white rounded-xl ",
          }}
          color="default"
          // isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setpage}
        />
      }
      css={{ width: "100%", overflowX: "auto" }}
    >
      <TableHeader className="flex w-full ">
        <TableColumn
          colSpan={6}
          className="m-auto flex flex-row w-[95%] items-center justify-around bg-slate-200"
        >
          <div>Product</div>
          <div>Total Payment</div>
          <div>Status</div>
          <div>Phone Number</div>
          <div>Delivery Services</div>
          <div>Action</div>
        </TableColumn>
      </TableHeader>
      <TableBody>
        {order
          
          .slice((page - 1) * 2, (page - 1) * 2 + 2)
          .map((order, index) => (
            <TableRow key={order.id} className="">
              <TableCell colSpan={6} className=" w-full">
                <Table
                  className="rounded-3xl"
                  classNames={{
                    table: "border-[2px] w-full  border-slate-300 rounded-xl",
                    thead:
                      "rounded-t-lg border-dashed border-b-[3px] border-slate-400",
                    tbody: "rounded-b-lg",

                    td: "border-b-[2px] border-slate-200 p-3",
                  }}
                  aria-label="Products Table"
                  css={{ marginTop: "10px", width: "100%" }}
                >
                  <TableHeader>
                    <TableColumn>
                      <div className="flex flex-row items-center">
                        Customer: {order.customer} /{" "}
                        <div className="pl-2 text-slate-400 font-[600] text-xs">
                          {order.date.split("T")[0]}
                        </div>
                      </div>
                    </TableColumn>
                    <TableColumn>
                      {order.total_amount.toLocaleString("vi-VN")} vnđ
                    </TableColumn>
                    <TableColumn>
                      <div
                        className=" text-slate-400 m-auto w-fit p-1 rounded-lg"
                        style={{
                          backgroundColor: statusColorMap[order.status],
                        }}
                        size="sm"
                      >
                        {statusContentMap[order.status]}
                      </div>
                    </TableColumn>
                    <TableColumn className="flex justify-center items-center">
                      {order.orderNumber}
                    </TableColumn>
                    <TableColumn className="font-mono text-md">
                      No ,Order:{order.id}
                    </TableColumn>
                    <TableColumn>
                      {(order.status == "Pending" ||
                        order.status == "Shipping") && (
                        <Button
                          onClick={async() => {
                            await dispatch(
                              OrderChangeStatus({
                                id: order.id,
                                status: "Cancel",
                              })
                            );
                          }}
                          size="small"
                          color="error"
                          className={
                            "text-red-400 bg-red-100 border-[2px] border-red-400"
                          }
                        >
                          Cancel Order
                        </Button>
                      )}
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {order.products.map((product, prodIndex) => (
                      <TableRow key={prodIndex}>
                        <TableCell>
                          {
                            <User
                              avatarProps={{ radius: "lg", src: product.image }}
                              description={
                                <div className="text-xs font-mono">
                                  {product.price}
                                </div>
                              }
                              name={product.name}
                            >
                              {product.price}
                            </User>
                          }
                        </TableCell>
                        <TableCell>
                          {(product.price * product.quantity).toLocaleString(
                            "vi-VN"
                          )}{" "}
                          vnđ
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-row items-center gap-1">
                            {product.size}/
                            <div
                              className="w-10 h-5 rounded-md"
                              style={{ backgroundColor: product.color }}
                            ></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-bold flex flex-row">
                            Address:
                            <div className="font-thin text-md">
                              {order.address}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.deliveryService}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
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
