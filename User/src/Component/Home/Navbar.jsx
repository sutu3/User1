import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  DropdownSection,
  User,
  Badge,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlog,
  faCartShopping,
  faComment,
  faMagnifyingGlass,
  faMinus,
  faPlus,
  faLocationDot,
  faRightToBracket,
  faTrash,
  faTruckRampBox,
  faList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import AccountSlice, {
  CheckAccount,
  CheckLogin,
  CreateAccount,
  CreateOTP,
} from "../Redux/AccountSlice";
import { useSelector } from "react-redux";
import { infor, orderNoneSignup, Product, Search } from "../Redux/Selector";
import OrderSlice, {
  DeleteOrderItem,
  UpdateOrderItem,
} from "../Redux/OrderSlice";
import FilterScice from "../Redux/FilterSlice";
const arr = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/" },
  { name: "Male", link: "/gender?name=Nam" },
  { name: "Female", link: "/gender?name=Nữ" },
  { name: "Unisex", link: "/gender?name=Unisex" },
];
const showToast = () => {
  toast.success("hello", {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};
export default function App() {
  const navigate=useNavigate()
  const order = useSelector(orderNoneSignup);
  const product = useSelector(Product);
  const dispatch = useDispatch();
  useEffect(() => {
    const newproduct = order.map((el) => {
      const productItem = product.find(
        (el1) => el1.product_id === el.productID
      );

      if (productItem) {
        const data = productItem.categories.find(
          (el2) => el2.color === el.color && el2.sizeEnum === el.sizeID
        );

        if (data) {
          return { ...el, product_price: data.price_sale };
        }
      }

      return el;
    });

    // Only dispatch if newproduct is different from current order
    if (JSON.stringify(newproduct) !== JSON.stringify(order)) {
      dispatch(OrderSlice.actions.pushOrder(newproduct));
    }
  }, [order, product, dispatch]);
  const Infor = useSelector(infor);
  const [display, setdisplay] = useState(
    localStorage.getItem("infor") ? true : false
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [flat, setflat] = useState(false);
  const [opt, setopt] = useState(false);
  const [userUp, setuserUp] = useState({
    email: "",
    pass: "",
    name: "",
    phone: 0,
  });
  const [userIn, setuserIn] = useState({
    email: "",
    pass: "",
  });
  const search=useSelector(Search)
  const handleSignIn = () => {
    setflat(true);
    onOpen();
  };
  const handleSignUp = () => {
    setflat(false);
    onOpen();
  };
  const handleCheckSignUp = async () => {
    if (!opt) {
      const checkemail = await dispatch(CheckAccount(userUp.email));
      if (checkemail.payload) {
        toast.success("Tài Khoản đã đăng ký", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setflat(true);
      } else {
        const opt = await dispatch(CreateOTP(userUp.email));
        setopt(opt);
        setopt(true);
      }
    } else {
      await dispatch(
        CreateAccount({
          email: userUp.email,
          username: userUp.name,
          phoneNumber: userUp.phone,
          password: userUp.pass,
          roleID: 2,
        })
      );
      setdisplay(true);
      toast.success("Tài Khoản đã được tạo", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setopt(false),
        setuserUp({
          email: "",
          pass: "",
          name: "",
          phone: 0,
        });
      setuserIn({ email: "", pass: "" });
      onClose();
    }
  };
  const handleCheckSignIn = async () => {
    await dispatch(
      CheckLogin({
        email: userIn.email,
        pass: userIn.pass,
      })
    );
    localStorage.getItem("infor") ? setdisplay(true) : setdisplay(false);
    onClose();
  };
  return (
    <div className="w-full fixed z-50 backdrop-blur-3xl flex flex-row h-16 justify-around  shadow-sm shadow-slate-300 border-slate-200">
      <div className=" h-full items-center flex  gap-3">
        <FontAwesomeIcon
          icon={faBlog}
          size="2xl"
          style={{ color: "#3fd6ff" }}
        />
        <div className="font-bold font-mono text-xl">ACME</div>
      </div>
      <div className="w-[400px] flex flex-row h-full items-center gap-5 justify-start">
        {arr.map((el, index) => (
          <div key={index} className="font-bold">
            <Link to={el.link} onClick={()=>dispatch(FilterScice.actions.filtersearch(''))}>{el.name}</Link>
          </div>
        ))}
      </div>
      <div className="w-[500px] flex flex-row items-center gap-3">
        <Input
          value={search}
          onValueChange={(e)=>dispatch(FilterScice.actions.filtersearch(e))}
          classNames={{
            base: "w-[300px] h-10",
            mainWrapper: "h-full",
            input: "text-small ",
            inputWrapper:
              "h-full  font-normal text-default-500 border-[2px] rounded-lg border-slate-200 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          type="search"
        />
        <div className="flex   justify-start">
          <Dropdown
          showArrow
              radius="sm"
              classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "p-0 border-small border-divider bg-background",
              }}
            aria-label="Multiple selection example"
            variant="flat"
            
          
          >
            <DropdownTrigger>
              <Button
                variant="ghost"
                disableRipple
                className="focus:outline-none hover:border-0"
              >
                <Badge
                  content={order.length}
                  className="bg-blue-300"
                  color="primary"
                >
                  <FontAwesomeIcon size="xl" icon={faCartShopping} />
                </Badge>
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              aria-label="Custom item styles"
              disabledKeys={["profile"]}
              className="p-3 bg-white rounded-xl shadow-inner h-[300px] overflow-y-scroll"
              itemClasses={{
                base: [
                  "rounded-md",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "data-[hover=true]:bg-default-100",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[selectable=true]:focus:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              }}
            >
            {/* <DropdownItem
                    key="Orders"
                    endContent={<FontAwesomeIcon icon={faTruckRampBox} />}
                  >
                  <Link to={'order'}>Orders</Link>
                    
                  </DropdownItem> */}
              <DropdownItem className=""
              startContent={<div>{order.length} Sản Phẩm</div>}
              >
                <Link to={"/cart"}>Xem tất cả</Link>
              </DropdownItem>
              {order.map((el) => (
                <DropdownItem
                  className="border-b-[2px] border-slate-200  rounded-none"
                  endContent={
                    <div>
                      <Button
                        size="sm"
                        onClick={async () => {
                          if (el.quantity - 1 != 0) {
                            if (Object.entries(Infor).length != 0) {
                              await dispatch(
                                UpdateOrderItem({
                                  order_items_id: el.order_items_id,
                                  product_price: el.product_price,
                                  price_base: el.price_base,
                                  quantity: el.quantity - 1,
                                })
                              );
                            } else {
                              dispatch(
                                OrderSlice.actions.UpdateQuantity({
                                  productID: el.productID,
                                  quantity: el.quantity - 1,
                                  colorID: el.colorID,
                                  sizeID: el.sizeID,
                                })
                              );
                            }
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faMinus}
                          style={{ color: "#74C0FC" }}
                        />
                      </Button>
                      <span className="p-2">{el.quantity}</span>
                      <Button
                        size="sm"
                        className="w-5"
                        onClick={async () => {
                          console.log(Infor);
                          if (Object.entries(Infor).length != 0) {
                            await dispatch(
                              UpdateOrderItem({
                                order_items_id: el.order_items_id,
                                product_price: el.product_price,
                                price_base: el.price_base,
                                quantity: el.quantity + 1,
                              })
                            );
                          } else {
                            dispatch(
                              OrderSlice.actions.UpdateQuantity({
                                productID: el.productID,
                                quantity: el.quantity + 1,
                                colorID: el.colorID,
                                sizeID: el.sizeID,
                              })
                            );
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ color: "#74C0FC" }}
                        />
                      </Button>
                    </div>
                  }
                  startContent={
                    <div
                      onClick={async () => {
                        if (Object.entries(Infor).length != 0) {
                          await dispatch(DeleteOrderItem(el.order_items_id));
                        } else {
                          // console.log(el);
                          const data = order.filter(
                            (el1) =>
                              el1.productID !== el.productID ||
                              el1.colorID !== el.colorID ||
                              el1.sizeID !== el.sizeID
                          );
                          // console.log(data);
                          dispatch(OrderSlice.actions.pushOrder(data));
                        }
                      }}
                      className="w-6 justify-center items-center flex rounded-full h-6 hover:border-[2px] hover:border-red-400"
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#ff0a74" }}
                      />
                    </div>
                  }
                  key={el.productID}
                >
                  <div className="w-full flex justify-between gap-2">
                    <User
                      avatarProps={{
                        size: "md",
                        src: product.find(
                          (el1) => el1.product_id == el.productID
                        )
                          ? product.find(
                              (el1) => el1.product_id == el.productID
                            ).imagesMap[0].image_urlString
                          : "",
                      }}
                      description={
                        <div className="flex flex-row justify-between w-[150px] items-center gap-1 ">
                          <div className="flex flex-row justify-center items-center gap-1 font-serif font-bold">
                            {product.length != 0
                              ? product
                                  .find((el1) => el1.product_id == el.productID)
                                  .categories.find(
                                    (el1) =>
                                      el1.catetoryColor == el.colorID &&
                                      el1.catetorySize == el.sizeID
                                  ).sizeEnum
                              : ""}
                            /{" "}
                            <div
                              className="h-5 w-10 rounded-xl"
                              style={{
                                backgroundColor:
                                  product.length != 0
                                    ? product
                                        .find(
                                          (el1) =>
                                            el1.product_id == el.productID
                                        )
                                        .categories.find(
                                          (el1) =>
                                            el1.catetoryColor == el.colorID &&
                                            el1.catetorySize == el.sizeID
                                        ).color
                                    : "",
                              }}
                            ></div>
                          </div>
                          <div>
                            {el.product_price.toLocaleString("vi-VN") + " vnd"}
                          </div>
                        </div>
                      }
                      name={el.product_name}
                    />
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="w-fit flex ">
          {!display ? (
            <div className="w-[100px] flex flex-row gap-5">
              <Button onClick={handleSignIn}>Sign In</Button>
              <Button onClick={handleSignUp}>Sign up</Button>
            </div>
          ) : (
            <Dropdown
              showArrow
              radius="sm"
              classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "p-0 border-small border-divider bg-background",
              }}
            >
              <DropdownTrigger>
                <Button
                  variant="ghost"
                  className="bg-slate-200 font-mono"
                  disableRipple
                >
                  Open Menu
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Custom item styles"
                disabledKeys={["profile"]}
                className="p-3 bg-white rounded-3xl shadow-inner shadow-slate-400"
                itemClasses={{
                  base: [
                    "rounded-md",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-default-100",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                }}
              >
                <DropdownSection aria-label="Profile & Actions" showDivider>
                  <DropdownItem
                    isReadOnly
                    key="profile"
                    className="opacity-100  h-14 gap-2"
                  >
                    <User
                      name={Infor.username}
                      description={Infor.email}
                      classNames={{
                        name: "text-default-600",
                        description: "text-default-500",
                      }}
                      avatarProps={{
                        size: "sm",
                        src: Infor.avatarString,
                      }}
                    />
                  </DropdownItem>
                  <DropdownItem
                    key="Account"
                    endContent={<FontAwesomeIcon icon={faUser} />}
                  >
                  <Link to={'infor'}>Account Information</Link>
                    
                  </DropdownItem>
                  <DropdownItem
                    key="Orders"
                    endContent={<FontAwesomeIcon icon={faTruckRampBox} />}
                  >
                  <Link to={'order'}>Orders</Link>
                    
                  </DropdownItem>
                  <DropdownItem
                    key="new_project"
                    endContent={<FontAwesomeIcon icon={faLocationDot} />}
                  >
                  <Link to={'address'}>Address list</Link>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection aria-label="Help & Feedback">
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="border-[2px] border-red-400 text-red-400"
                    onClick={() => {
                      localStorage.removeItem("infor");
                      navigate('/')
                      dispatch(AccountSlice.actions.updateInfor({}));
                      setdisplay(false);
                      const arr = order.map((el) => ({
                        product_name: el.product_name,
                        product_price: el.product_price,
                        price_base: el.price_base,
                        quantity: el.quantity,
                        productID: el.productID,
                        sizeID: el.sizeID,
                        colorID: el.colorID,
                        color: el.color,
                        size: el.size,
                        createAt: el.updatedAt ? el.updatedAt : el.createdAt,
                      }));
                      dispatch(OrderSlice.actions.pushOrder(arr));
                    }}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-white rounded-xl shadow-inner shadow-slate-300">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {flat ? "Sign In" : opt ? "Check OPT" : "Sign Up"}
              </ModalHeader>
              <ModalBody>
                {flat ? (
                  <div className="flex flex-col gap-3">
                    <div>
                      <Input
                        value={userIn.email}
                        onChange={(e) => {
                          setuserIn({ ...userIn, email: e.target.value });
                        }}
                        key={"Email"}
                        type="email"
                        label="Email"
                        className="w-full"
                        labelPlacement={"outside-left"}
                        placeholder="Enter Your Email"
                        classNames={{
                          inputWrapper:
                            "border-[2px] border-slate-200 rounded-lg w-[300px]",
                          label: "w-[50px]",
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        value={userIn.pass}
                        onChange={(e) => {
                          setuserIn({ ...userIn, pass: e.target.value });
                        }}
                        key={"pass"}
                        type="text"
                        label="Pass"
                        className="w-full"
                        labelPlacement={"outside-left"}
                        placeholder="Enter Your Pass"
                        classNames={{
                          inputWrapper:
                            "border-[2px] border-slate-200 rounded-lg w-[300px]",
                          label: "w-[50px]",
                        }}
                      />
                    </div>
                  </div>
                ) : opt ? (
                  <div>
                    <div>
                      <Input
                        value={userUp.opt}
                        onChange={(e) => {
                          // setuserUp({ ...userUp, phone: e.target.value });
                          setopt(e.target.value);
                        }}
                        key={"phone"}
                        type="number"
                        label="OPT"
                        className="w-full"
                        labelPlacement={"outside-left"}
                        placeholder="Enter Your OPT Number"
                        classNames={{
                          inputWrapper:
                            "border-[2px] border-slate-200 rounded-lg w-[300px]",
                          label: "w-[50px]",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div>
                      <Input
                        value={userUp.phone}
                        onChange={(e) => {
                          setuserUp({ ...userUp, phone: e.target.value });
                        }}
                        key={"phone"}
                        type="number"
                        label="Phone"
                        className="w-full"
                        labelPlacement={"outside-left"}
                        placeholder="Enter Your Phone Number"
                        classNames={{
                          inputWrapper:
                            "border-[2px] border-slate-200 rounded-lg w-[300px]",
                          label: "w-[50px]",
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        value={userUp.email}
                        onChange={(e) => {
                          setuserUp({ ...userUp, email: e.target.value });
                        }}
                        key={"Email"}
                        type="email"
                        label="Email"
                        className="w-full"
                        labelPlacement={"outside-left"}
                        placeholder="Enter Your Email"
                        classNames={{
                          inputWrapper:
                            "border-[2px] border-slate-200 rounded-lg w-[300px]",
                          label: "w-[50px]",
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        value={userUp.pass}
                        onChange={(e) => {
                          setuserUp({ ...userUp, pass: e.target.value });
                        }}
                        key={"pass"}
                        type="text"
                        label="Pass"
                        className="w-full"
                        labelPlacement={"outside-left"}
                        placeholder="Enter Your Pass"
                        classNames={{
                          inputWrapper:
                            "border-[2px] border-slate-200 rounded-lg w-[300px]",
                          label: "w-[50px]",
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        key={"name"}
                        value={userUp.name}
                        onChange={(e) => {
                          setuserUp({ ...userUp, name: e.target.value });
                        }}
                        type="text"
                        label="Name"
                        className="w-full"
                        labelPlacement={"outside-left"}
                        placeholder="Enter Your UserName"
                        classNames={{
                          inputWrapper:
                            "border-[2px] border-slate-200 rounded-lg w-[300px]",
                          label: "w-[50px]",
                        }}
                      />
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    !flat ? handleSignIn() : handleSignUp();
                  }}
                >
                  {flat ? "Sign Up" : "Sign In"}
                </Button>
                <Button
                  color="primary"
                  onPress={flat ? handleCheckSignIn : handleCheckSignUp}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
