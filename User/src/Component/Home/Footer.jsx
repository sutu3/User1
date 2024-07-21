import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import React from "react";
import { FaFacebookSquare, FaInstagram, FaTwitter, FaPinterest, FaGoogle } from 'react-icons/fa';
const Footer = () => {
  return (
    <div className="w-full h-[400px] p-10  bg-gradient-to-tr from-[#28363f] to-[#201c32] text-white">
      <div className="flex flex-col w-full">
        <div className="flex flex-row h-[250px] justify-between w-full border-b-2 mb-5 border-slate-200">
        <div className="flex flex-row gap-12 justify-start w-[700px]">

            <div className="flex flex-row">
                <div className="flex flex-col gap-5">
                    <div className="text-lg font-[600]">Platform</div>
                    <div className="font-serif font-[100] text-[14px]">Plans & Pricing</div> 
                    <div className="font-serif font-[100] text-[14px]">Personal AI Manager</div>
                    <div className="font-serif font-[100] text-[14px]">AI Data Processing</div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col gap-5">
                    <div className="text-lg font-[600]">Company</div>
                    <div className="font-serif font-[100] text-[14px]">About Us</div> 
                    <div className="font-serif font-[100] text-[14px]">Work with Us</div>
                    <div className="font-serif font-[100] text-[14px]">Blog & News</div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col gap-5">
                    <div className="text-lg font-[600]">Resources</div>
                    <div className="font-serif font-[100] text-[14px]">Documentation</div> 
                    <div className="font-serif font-[100] text-[14px]">Free Demo</div>
                    <div className="font-serif font-[100] text-[14px]">Press Conferences</div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col gap-5">
                    <div className="text-lg font-[600]">Legal</div>
                    <div className="font-serif font-[100] text-[14px]">Privacy Policy</div> 
                    <div className="font-serif font-[100] text-[14px]">Term of Service</div>
                    <div className="font-serif font-[100] text-[14px]">Cookies Policy</div>
                    <div className="font-serif font-[100] text-[14px]">Data Processing</div>
                </div>
            </div>
        </div>
            <div> <Card className="max-w-[400px] bg-slate-800 border-[2px] border-slate-200 rounded-lg">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">VTI</p>
          <p className="text-small text-default-500">VTI Accademy</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Chào bạn! Chúc bạn có một ngày thật vui vẻ, tràn đầy năng lượng và thành công trong mọi công việc của mình.</p>
      </CardBody>
      <Divider/>
    </Card>
    </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className=" h-full items-center flex  gap-3">
            <FontAwesomeIcon
              icon={faBlog}
              size="2xl"
              style={{ color: "#3fd6ff" }}
            />
            <div className="font-bold font-mono text-xl">ACME</div>
          </div>
          <div className="flex flex-row gap-5">
          {/* <FontAwesomeIcon icon={FaFacebook} /> */}
          <FaFacebookSquare className="outline-offset-4 rounded-2xl outline-double outline-slate-200 outline-2" size={24} />
          <FaGoogle className="outline-offset-4 rounded-2xl outline-double outline-slate-200 outline-2" size={24}/>
          <FaInstagram className="outline-offset-4 rounded-2xl outline-double outline-slate-200 outline-2" size={24}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
