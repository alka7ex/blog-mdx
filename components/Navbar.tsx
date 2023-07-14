'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Search } from "@/components/Search";
import Image from "next/image";
import ModeToggle from "./theme-button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export const Navbar = () => {
  return (
    <nav className="container pl-4 pr-1 h-20 w-auto flex flex-wrap bg-header">
      <div className="my-auto">
        <Link href='/' className="text-2xl text-bold">
          <Image
            src="/favicon.ico"
            width={52}
            height={52}
            alt="logo" />
        </Link>
      </div>
      <div className="grow">

      </div>
      <div className="flex flex-row">
        <div className="my-auto w-40 md:w-48 lg:w-60">
          <Search></Search>
        </div>
        <div className="my-auto mx-4">
          <ModeToggle aria-label="theme"></ModeToggle>
        </div>
        <div className="my-auto mr-2" >
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="dropdown">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href='/resume' className="">
                  <div>Resume</div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </nav >
  )
}
