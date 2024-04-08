
import React from "react";
import styles from "./AboutUs.module.css"
import { Metadata} from "next";
import PolicyCard from "@/components/cards/CardImage";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Policy Page",
  description: "This is policy page",
  keywords: ['shop', 'ecommerce', 'sell']
};
const page = () => {

  return (
    <>
    <div className=" dark:bg-gray-900 ">
        <div className="gap-8 items-center  py-4 sm:px-12 px-4 mx-auto max-w-screen-xl xl:gap-36 md:grid md:grid-cols-2 lg:px-6 xl:py-6 xl:px-0">
            <div className="mt-4 md:mt-0 ">
                <h2 className="mb-4 text-4xl  font-bold roboto-regular text-gray-700  ">Private Policy </h2>
                <p className="mb-6 font-light roboto-light text-gray-400 md:text-lg dark:text-gray-400">Our return policy allows for returns within 30 days of the purchase date. Items must be returned in new and unused condition, with all original tags and labels attached</p>
                
            </div>
           <div className="flex gap-8">
              <Image   src={"https://i.pinimg.com/564x/4f/c9/af/4fc9af7e8add7e43c3aeae309abde842.jpg"} width={250} height={250} alt=""/>  
              <Image   src={"https://i.pinimg.com/564x/6f/d4/39/6fd4391713c827d1931c3364feddfbce.jpg"} width={250} height={250} alt=""/>  
            </div>  
        </div>
       </div>
       <PolicyCard/>

        
    </>
  );
};

export default page;
