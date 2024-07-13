import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/react";
import React from "react";

const index = () => {
  return (
    <div className="bg-[#f8f7f5] w-full h-full -translate-y-4 flex flex-row justify-around">
      <div className="w-[50%] mt-10 flex flex-col gap-5">
        <div>Delivery Information</div>
        <div className="bg-white w-full flex-col flex p-4 gap-4 pt-10">
          <div className="w-full flex flex-row justify-between">
            <div className="w-[48%]">
              <Input
                label="Name"
                isClearable
                radius="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90 p-3 pb-10 pl-0",
                  input: [
                    "bg-transparent ",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-inner border-[2px] border-slate-200 rounded-md",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                  ],
                }}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="w-[48%]">
              <Input
                label="Moblie Number"
                isClearable
                radius="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90 p-3 pb-10 pl-0",
                  input: [
                    "bg-transparent ",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-inner border-[2px] border-slate-200 rounded-md",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                  ],
                }}
                type="number"
                placeholder="Enter Your number"
              />
            </div>
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="w-[48%]">
              <Input
                label="Email"
                isClearable
                radius="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90 p-3 pb-10 pl-0",
                  input: [
                    "bg-transparent ",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-inner border-[2px] border-slate-200 rounded-md",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                  ],
                }}
                type="email"
                placeholder="Enter Your Email"
              />
            </div>
            <div className="w-[48%]">
              <Input
                label="Address"
                isClearable
                radius="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90 p-3 pb-10 pl-0",
                  input: [
                    "bg-transparent ",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-inner border-[2px] border-slate-200 rounded-md",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                  ],
                }}
                type="text"
                placeholder="Enter Your Address"
              />
            </div>
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="w-[48%]">
              <Input
                label="State"
                isClearable
                radius="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90 p-3 pb-10 pl-0",
                  input: [
                    "bg-transparent ",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-inner border-[2px] border-slate-200 rounded-md",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                  ],
                }}
                placeholder="Enter Your State"
              />
            </div>
            <div className="w-[48%]">
              <Input
                label="City"
                isClearable
                radius="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90 p-3 pb-10 pl-0",
                  input: [
                    "bg-transparent ",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-inner border-[2px] border-slate-200 rounded-md",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                  ],
                }}
                type="text"
                placeholder="Enter Your City"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[40%] mt-10 flex flex-col gap-5">
        <div>Delivery Information</div>
        <div className="bg-white w-full flex-col flex p-4 gap-4 pt-10">
d
        </div>
      </div>
    </div>
  );
};

export default index;
