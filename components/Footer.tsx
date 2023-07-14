import { Github, Instagram } from "lucide-react";
import { Send } from "lucide-react";
import { Linkedin } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="shadow mt-4 pb-10 flex flex-grow h-40 bg-header">
            <div className="container my-auto relative">
                <div className="container flex flex-row flex-grow space-x-10 relative justify-center">
                    <a className='btn btn-ghost' href='https://www.linkedin.com/in/farhai/'>
                        <Linkedin aria-label="linkedin"/>
                    </a>
                    <a className='btn btn-ghost' href='https://www.instagram.com/alkafarh/'>
                        <Instagram aria-label="instagram" />
                    </a>
                    <a className='btn btn-ghost' href='https://github.com/alka7ex'>
                        <Github aria-label="github"/>
                    </a>
                    <a className='btn btn-ghost' href='mailto:farhienzahaikal@gmail.com'>
                        <Send aria-label="mail"/>
                    </a>
                </div>
            </div>
        </footer>
    )
}
