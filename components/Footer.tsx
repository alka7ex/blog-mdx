import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="rounded-lg shadow dark:bg-gray-900 mt-4 pb-10 flex flex-grow">
            <div className="container my-auto relative">
                <div className="container flex-grow gap-4 relative justify-center">
                    <a className='btn btn-ghost' href='https://www.linkedin.com/in/farhai/'>
                        <Image
                            src="/linkedin.svg"
                            width={24}
                            height={24}
                            alt="Linkedin" />
                    </a>
                    <a className='btn btn-ghost' href='https://www.instagram.com/alkafarh/'>
                        <Image
                            src="/instagram.svg"
                            width={24}
                            height={24}
                            alt="Instagram" />
                    </a>
                    <a className='btn btn-ghost' href='https://github.com/alka7ex'>
                        <Image
                            src="/github.svg"
                            width={24}
                            height={24}
                            alt="Github" />
                    </a>
                    <a className='btn btn-ghost' href='mailto:farhienzahaikal@gmail.com'>
                        <Image
                            src="/mail.svg"
                            width={24}
                            height={24}
                            alt="Mail" />
                    </a>
                </div>
            </div>
        </footer>
    )
}
