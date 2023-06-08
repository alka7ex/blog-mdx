import Link from "next/link"
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="container h-20 w-auto flex flex-wrap bg-transparent">
        <div className="my-auto">
          <Link href='/' className="text-2xl text-bold">Haikal</Link>
        </div>
        <div className="grow"> 
        </div>
        <div className="my-auto">
          <Link href='/resume' className="">
            <Button variant="outline" className="text-lg text-bold">Resume</Button>
          </Link>
      </div>
    </nav>
  )
}
