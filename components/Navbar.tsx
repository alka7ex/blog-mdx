import Link from "next/link"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/Search";

export const Navbar = () => {
  return (
    <nav className=" mx-4 h-20 flex flex-wrap bg-transparent">
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
      <div className="my-auto mx-2 justify-end">
        <Search></Search>
      </div>
      <div className="my-auto">
        <Link href='/resume' className="h-2">
          <Button variant="link" className="text-lg text-bold">Resume</Button>
        </Link>
      </div>
    </nav>
  )
}
