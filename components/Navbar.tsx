import Link from "next/link"
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="container h-14 w-auto flex flex-wrap">
        <div className="my-auto">
          <Link href='/' className="">Haikal</Link>
        </div>
        <div className="grow"> 
        </div>
        <div className="my-auto">
          <Link href='/resume' className="">
            <Button variant="outline">Resume</Button>
          </Link>
      </div>
    </nav>
  )
}
