
import whiteLogo from "../../assets/img/logo.png";
import blackLogo from "../../assets/img/logo-black.png";

function BrandLogo({ theme, expanded=false }) {
    const src = theme === 'theme-1' ?  whiteLogo : blackLogo;
    return (
        <a className='logo' href={'/'}>
            <img className="w-100" src={src} alt="Duvi's logo" />
            {expanded && <span className='ms-3'>dmsosa</span>}
        </a>
    )
}

export default BrandLogo;