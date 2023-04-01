import {Link} from "react-router-dom"

export default function NavItem({to,children, ...props}){
    const path = window.location.pathname
    
    return(
        <li className={path === to ? "active" : ""}>
            <Link {...props} to={to}>
                {children}
            </Link>
        </li>

    );

}