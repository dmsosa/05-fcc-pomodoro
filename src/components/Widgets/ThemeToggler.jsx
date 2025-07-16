import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggler({ theme, setTheme }) {
    return <div className={`theme-toggler ${theme === 'theme-1' ? '': 'active'}`} onClick={() => {
        if (theme === 'theme-1') {
            setTheme('theme-2');
        } else {
            setTheme('theme-1');
        }
    }}>
            <FaSun className="sun"/>
            <FaMoon className="moon"/>
    </div>
}