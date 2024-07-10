import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlog,
  faComment,
  faMagnifyingGlass,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
const arr = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/" },
  { name: "Male", link: "/" },
  { name: "Female", link: "/" },
  { name: "Unisex", link: "/" },
];
const showToast = () => {
    toast.success('hello', {
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
        {arr.map((el) => (
          <div className="font-bold">{el.name}</div>
        ))}
      </div>
      <div className="w-[500px] flex flex-row items-center gap-3">
        <Input
        className=""
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
        {!localStorage.getItem("infor") ? (
          <div className="w-[100px] flex flex-row gap-5">
            <Button onClick={showToast}>Sign In</Button>
            <Button>Sign up</Button>
          </div>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                endContent={
                  <FontAwesomeIcon
                    icon={faRightToBracket}
                    style={{ color: "#74C0FC" }}
                  />
                }
              >
                Sign In
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
