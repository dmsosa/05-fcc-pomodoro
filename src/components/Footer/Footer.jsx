import { MdCopyright } from "react-icons/md";

export default function Footer() {

    return (
        <footer className="position-relative w-100 ">
            <div className="bg-1 w-100 p-3 pb-6 d-flex justify-content-between align-items-center">
                <a href="https://github.com/dmsosa" className="text-center fs-6 text-decoration-none"><MdCopyright/>dmsosa | 2025</a>
                <span>all rights reserved</span>
            </div>
        </footer>
            
    )
}