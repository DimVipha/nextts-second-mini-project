import { describe } from "node:test";
import { title } from "process";
import Image from "next/image";
import React from "react";
import { Button, image } from "@nextui-org/react";
export type ParamProps = {
  params: {
    id: number;
  };
};

async function getDetail(id: number) {
  const productDetail = await fetch(`https://store.istad.co/api/products/${id}/`);
  return productDetail.json();
}

export async function generateMetadata({params}: any) {
  const id = params.id
  const product = await getDetail(id);
  return {
    title: product?.title,
    describe: product.description,
    openGraph: {
      images: product.thumbnail,
    },
  }
}


async function page({ params }: ParamProps) {
  const id = params.id;
  const productDetail = await getDetail(id);
  return (
    <div className="max-w-screen-xl rounded-xl bg-gray-100 gap-8 mt-16 p-8 mx-auto flex justify-between">
      <div className=" w-[70vw]  flex items-center mx-auto shadow-xl  bg-white p-16  rounded-lg ">
      <Image src={productDetail.image}  alt={""} width={400} height={200} className="rounded-lg max-h-80  object-cover"  />
      <div className="w-1/2  pl-16">
        <div className="flex gap-4 h-18 mt-3 items-center">
        <Image className="rounded-full" width={60} height={60} src="https://i.pinimg.com/736x/65/99/b8/6599b8973f8faa5ef0a9c4fa042cadc9.jpg" alt=""/>
        <h1>{productDetail.seller}</h1>
        </div>
     <div className=" mt-4 ">
     <h1 className="text-3xl pb-4">{productDetail.name}</h1>
      <p>{productDetail.desc}</p>
      <p className="text-3xl pt-4">${productDetail.price}</p>
      <Button  className="bg-blue-500 text-white mt-3">Buy Now</Button>
     </div>
      </div>
      </div>
    </div>

  );
}

export default page;
