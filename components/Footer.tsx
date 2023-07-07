import { Github, Instagram } from "lucide-react";
import { Send } from "lucide-react";
import { Linkedin } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="shadow mt-4 pb-10 flex flex-grow h-40">
            <div className="container my-auto relative">
                <div className="container flex flex-row flex-grow space-x-10 relative justify-center">
                    <a className='btn btn-ghost' href='https://www.linkedin.com/in/farhai/'>
                        <Linkedin />
                    </a>
                    <a className='btn btn-ghost' href='https://www.instagram.com/alkafarh/'>
                        <Instagram />
                    </a>
                    <a className='btn btn-ghost' href='https://github.com/alka7ex'>
                        <Github />
                    </a>
                    <a className='btn btn-ghost' href='mailto:farhienzahaikal@gmail.com'>
                        <Send />
                    </a>
                </div>
            </div>
        </footer>
    )
}
