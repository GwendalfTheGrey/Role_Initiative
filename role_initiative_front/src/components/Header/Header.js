import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, Link } from "react-router-dom";
import style from "./Header.module.scss";
import { ReactComponent as LogoText } from "../../assets/images/logo-text.svg";
import { ReactComponent as LogoDice } from "../../assets/images/logo-dice.svg";
import { ReactComponent as UserBody } from "../../assets/images/user-silhouette.svg";
import { ReactComponent as UserDice } from "../../assets/images/user-dice.svg";
import { ReactComponent as Arrow } from "../../assets/images/arrow.svg";

export default function Header() {
    const user = useContext(AuthContext);

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
            <nav className={`page-max-width center-horizontal ${style.primary_nav}`}>
                <NavLink className={`${style.primary_nav_logo}`} to="/" title="Accueil">
                    <LogoText className={`${style.primary_nav_logo_text}`} />
                    <LogoDice className={`${style.primary_nav_logo_dice}`} />
                </NavLink>
                <button
                    className={`${style.mobile_menu}`}
                    aria-controls="primary-navigation"
                    aria-expanded={ariaExpanded}
                    onClick={handleExpanded}
                >
                    <Arrow/>
                </button>
                <ul className={`${style.primary_nav_links}`} ref={ref}>
                    <li><NavLink
                        className={({ isActive }) => isActive ? `${style.active}` : ``}
                        to="/"
                        onClick={() => ariaExpanded === "true" && setAriaExpanded("false")}
                    >
                        Accueil
                    </NavLink></li>
                    <li><NavLink
                        className={({ isActive }) => isActive ? `${style.active}` : ``}
                        to={user ? "fantasy" : "login-register"}
                        onClick={() => ariaExpanded === "true" && setAriaExpanded("false")}
                    >
                        {user ? "Fantaisie" : "Connexion/Inscription"}
                    </NavLink></li>
                    {user &&
                        <>
                            <li><NavLink
                                className={({ isActive }) => isActive ? `${style.active}` : ``}
                                to="sci-fi"
                                onClick={() => ariaExpanded === "true" && setAriaExpanded("false")}
                            >
                                Sci-fi
                            </NavLink></li>
                            <li><NavLink
                                className={({ isActive }) => isActive ? `${style.active}` : ``}
                                to="horror-and-other"
                                onClick={() => ariaExpanded === "true" && setAriaExpanded("false")}
                            >
                                Horreur/Autre
                            </NavLink></li>
                            <li>
                                <Link className={`${style.user_icon}`}title="Profil">
                                    <UserBody className={`${style.user_icon_body}`} />
                                    <UserDice className={`${style.user_icon_dice}`} />
                                    <span>Profil</span>
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
}
