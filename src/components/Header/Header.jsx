

import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import BrandLogo from "../Widgets/BrandLogo";
import LinksListe from "../Widgets/LinkListe";

const links = [
    { title: 'Instagram', to: 'https://www.instagram.com/duvi_official/', icon: <FaInstagram />    },
    { title: 'GitHub', to: 'https://github.com/dmsosa/', icon: <FaGithub/> },
    { title: 'LinkedIn', to: 'https://www.linkedin.com/in/durian-sosa-807147241/', icon: <FaLinkedin /> },
    { title: 'YouTube', to: 'https://www.youtube.com/@EinfachDev', icon: <FaYoutube /> },
];

function Header({ theme }) {


    return (
        <header id="header" className="header bg-1">
            <a href="#header" className="hidden w-0 position-absolute top-0 left-0"></a>
            <BrandLogo  theme={theme} />
            <LinksListe links={links} />
        </header>
        
    )
}

export default Header;