

function LinksListe({ links, column=false }) {
    const dir = column ? 'flex-column gap-1':'flex-row gap-2';
    return (
        <ul className={`nav-links ${dir}`}>
            {links.map((link) => 
                (
                <li key={link.title}>
                    <a className={`link ${column ? 'justify-content-start':'justify-content-center'}`} href={link.to}>
                        {link.icon}
                    </a>
                </li>
                )
            )}
        </ul>
    );
}
export default LinksListe;