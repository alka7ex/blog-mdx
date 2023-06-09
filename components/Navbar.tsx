import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Search } from "@/components/Search";

export const Navbar = () => {
  return (
    <nav className="container h-20 w-auto flex flex-wrap bg-transparent">
      <div className="my-auto">
        <Link href='/' className="text-2xl text-bold">Haikal</Link>
      </div>
      <div className="grow">
      </div>
      <div className="my-auto mx-4">
        <Search></Search>
      </div>
      <div className="my-auto">
        <Link href='/resume' className="">
          <Button variant="outline" className="text-lg text-bold">Resume</Button>
        </Link>
      </div>
    </nav>
  )
}
