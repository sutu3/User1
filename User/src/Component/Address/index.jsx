import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  avatar,
  Pagination,
  Input,
  Button,
} from "@nextui-org/react";
import { infor } from "../Redux/Selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CreateAddress } from "../Redux/AccountSlice";
import { toast } from "react-toastify";
const columns = [
  { name: "NAME", uid: "name" },
  {
    name: "CreateAT",
    uid: "time",
  },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function App() {
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [addressinput, setaddress] = useState({
    title: "",
    state: "",
    city: "",
    country: "",
  });
  const Infor = useSelector(infor);
  const address = Infor.addresses.map((el) => ({
    id: el.id,
    address: el.state + ", " + el.country + ", " + el.city,
    title: el.title,
    time: el.created_at,
    avatar: <FontAwesomeIcon icon={faMapPin} />,
  }));
  const pages = Math.ceil(address.length / 5);
  console.log(address);
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: "https://cdn-icons-png.flaticon.com/512/6948/6948631.png",
            }}
            description={<div className="text-xs">{user.address}</div>}
            name={<div className="font-mono">{user.title}</div>}
          ></User>
        );
      case "time":
        return (
          <div className="flex flex-col">
            <div className="text-bold text-sm capitalize">
              {cellValue?cellValue.split("T")[0]+'/'+ cellValue.split("T")[1]:'--'}
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <div className="w-full h-full flex flex-row mt-10 gap-10">
      <div className="w-1/2 h-full flex justify-end items-center">
        <div className="h-[500px] w-[400px]  flex flex-col p-4 gap-5 border-[2px] border-slate-300 rounded-lg">
          <div className="flex flex-col gap-3">
            <div className="font-bold text-xl">Add New Address</div>
            <div className="text-xs text-slate-400">
              Create a new address to ensure accurate delivery information and
              conveniently transport products to your correct location.
            </div>
          </div>
          <div>
            <Input
              value={addressinput.title}
              onChange={(e) => {
                setaddress({ ...addressinput, title: e.target.value });
              }}
              type="text"
              label="title"
              className=""
              classNames={{
                base: "flex justify-around",
                input: "border-[2px] border-slate-300 p-2 rounded-lg w-[280px]",
              }}
              labelPlacement={"outside-left"}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Input
              value={addressinput.state}
              onChange={(e) => {
                setaddress({ ...addressinput, state: e.target.value });
              }}
              type="text"
              label="State"
              className=""
              classNames={{
                base: "flex justify-around",
                input: "border-[2px] border-slate-300 p-2 rounded-lg w-[280px]",
              }}
              labelPlacement={"outside-left"}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Input
              value={addressinput.city}
              onChange={(e) => {
                setaddress({ ...addressinput, city: e.target.value });
              }}
              type="text"
              label="district"
              className=""
              classNames={{
                base: "flex justify-around",
                input: "border-[2px] border-slate-300 p-2 rounded-lg w-[280px]",
                label: "text-[15px]",
              }}
              labelPlacement={"outside-left"}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Input
              value={addressinput.country}
              onChange={(e) => {
                setaddress({ ...addressinput, country: e.target.value });
              }}
              type="text"
              label="City"
              className=""
              classNames={{
                base: "flex justify-around",
                input: "border-[2px] border-slate-300 p-2 rounded-lg w-[280px]",
                label: "text-md",
              }}
              labelPlacement={"outside-left"}
              placeholder="Enter your email"
            />
          </div>
          <div className="w-full justify-center flex ">
            <Button
              className="w-[250px] bg-[#0bd4ed] text-white"
              onClick={async () => {
                await dispatch(
                  CreateAddress({
                    id: 0,
                    account_id: Infor.account_id,
                    city: addressinput.city,
                    state: addressinput.state,
                    country: addressinput.country,
                    title: addressinput.title,
                    phonenumer: Infor.phoneNumber,
                  })
                );
                setTimeout(()=>{
                    toast.success(
          `Action Add Completed`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
                },500)
                setaddress({
                  title: "",
                  state: "",
                  city: "",
                  country: "",
                });
              }}
            >
              Add new Address
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/3 h-full flex justify-center items-center">
        <Table
          classNames={{
            table: "border-[2px] w-full  border-slate-300 ",
            thead: "rounded-lg bg-slate-400",
            tbody: "rounded-b-lg",

            td: "border-b-[2px] border-slate-200 p-3",
          }}
          className="bg-white rounded-lg shadow-lg border-[2px] border-slate-200"
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
          aria-label="Example table with custom cells"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={address.slice((page - 1) * 5, (page - 1) * 5 + 5)}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
