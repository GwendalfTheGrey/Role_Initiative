import { NavLink } from "react-router-dom";
import style from "./Header.module.scss";
import { ReactComponent as LogoText } from "../../assets/images/logo-text.svg";
import { ReactComponent as LogoDice } from "../../assets/images/logo-dice.svg";
// import { ReactComponent as UserBody } from "../../assets/images/user-silhouette.svg";
// import { ReactComponent as UserDice } from "../../assets/images/user-dice.svg";
import { useEffect, useRef, useState } from "react";

export default function Header() {
    const [ariaExpanded, setAriaExpanded] = useState("false");

    const ref = useRef(null);

    useEffect(() => {
        const expandMenu = (e) => {
            if (ariaExpanded === "false") {
                return;
            }
            if (!ref.current?.contains(e.target)) {
                e.preventDefault();
                return setAriaExpanded("false");
            }
        };

        window.addEventListener("click", expandMenu);

        return () => {
            window.removeEventListener("click", expandMenu);
        };
    }, [ariaExpanded]);

    const handleExpanded = () => {
        if (ariaExpanded === "false") {
            return setAriaExpanded("true");
        }
        return setAriaExpanded("false");
    };

    return (
        <header>
            <nav className={`${style.primary_nav}`}>
                <NavLink className={`${style.primary_nav_logo}`} to="/">
                    <LogoText className={`${style.primary_nav_logo_text}`} />
                    <LogoDice className={`${style.primary_nav_logo_dice}`} />
                </NavLink>
                <button
                    className={`${style.mobile_menu}`}
                    aria-controls="primary-navigation"
                    aria-expanded={ariaExpanded}
                    onClick={handleExpanded}
                >
                    <div className={`${style.line} ${style.top}`} width="80" height="8" x="10" y="22" rx="4"></div>
                    <div className={`${style.line} ${style.middle}`} width="80" height="8" x="10" y="46" rx="4"></div>
                    <div className={`${style.line} ${style.bottom}`} width="80" height="8" x="10" y="70" rx="4"></div>
                </button>
                <ul className={`${style.primary_nav_links}`} ref={ref}>
                    {/* <li>
                        <div className={`${style.user_icon}`}>
                            <UserBody className={`${style.user_icon_body}`} />
                            <UserDice className={`${style.user_icon_dice}`} />
                        </div>
                    </li> */}
                    <li><NavLink
                        className={({ isActive }) => isActive ? `${style.active}` : ``}
                        to="/"
                        onClick={() => ariaExpanded === "true" && setAriaExpanded("false")}
                    >Accueil</NavLink></li>
                    <li><NavLink
                        className={({ isActive }) => isActive ? `${style.active}` : ``}
                        to="login-register"
                        onClick={() => ariaExpanded === "true" && setAriaExpanded("false")}
                    >Connexion/Inscription</NavLink></li>
                    <li><NavLink
                        className={({ isActive }) => isActive ? `${style.active}` : ``}
                        to="contact"
                        onClick={() => ariaExpanded === "true" && setAriaExpanded("false")}
                    >Contact</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}
