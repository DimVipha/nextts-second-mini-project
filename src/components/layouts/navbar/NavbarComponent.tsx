"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navbarItem } from "./menu";

export default function App() {
  const pathname = usePathname();
  if(pathname === "/login" || pathname === "/signup"){
    return null
  }
  return (
    <Navbar className="bg-gray-200 text-lg h-20 font-bold " disableAnimation>
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="start">
        <NavbarBrand>
          <Image
            width={50}
            className="mr-4 rounded-full"
            height={50}
            src={"/assets/pictureShop.png"}
            alt={""}
          />
          <p className="font-bold text-inherit">IVSHOPS</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4 lg: " justify="start">
        <NavbarBrand>
          <Image
            width={50}
            className="mr-4 rounded-full"
            height={50}
            src={"/assets/logo.jpg"}
            alt={""}
          />
          <p className="font-bold text-inherit">IVSHOPS</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-4 lg: " justify="center">
        {navbarItem.map((item, index: any) => (
          <NavbarItem key={index}>
            <Link
              color="foreground"
              href={item.path}
              className={`${
                pathname === item.path && "font-bold text-blue-800"
              }`}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
       
        <NavbarItem className="hidden sm:flex bg-blue-800 p-2 px-4 rounded-lg">
          <Link href="/signup" className="text-white">Signup</Link>
        </NavbarItem>
        <NavbarItem  className="hidden sm:flex">
          <Button as={Link} className=" from-blue-500 text-lg font-bold text-white bg-red-600 p-4 rounded-lg" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
       
      
      </NavbarContent>

      <NavbarMenu>
        {navbarItem.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === navbarItem.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={item.path}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem className="w-full text-[18px]">
          <Link href="/dashboard" className="bg-blue-800 rounded-lg p-3">Dashboard</Link>
        </NavbarItem>
        <NavbarItem className="w-full text-[18px]">
          <Link href="/dashboard">Login</Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
