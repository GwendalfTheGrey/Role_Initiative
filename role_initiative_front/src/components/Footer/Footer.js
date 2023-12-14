import { NavLink, Link } from "react-router-dom";
import style from "./Footer.module.scss";
import { ReactComponent as LogoText } from "../../assets/images/logo-text.svg";
import { ReactComponent as LogoDice } from "../../assets/images/logo-dice.svg";
import { ReactComponent as XLogo } from "../../assets/images/x-logo.svg";
import { ReactComponent as DiscordLogo } from "../../assets/images/discord-logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Footer() {
    const { user } = useContext(AuthContext);

    return (
        <footer>
            <nav className={`${style.footer_nav}`}>
                <div className={`${style.footer_nav_logo}`}>
                    <LogoText className={`${style.footer_nav_logo_text}`} />
                    <LogoDice className={`${style.footer_nav_logo_dice}`} />
                </div>
                <div className={`${style.footer_nav_content}`}>
                    <ul className={`${style.footer_nav_content_links}`}>
                        <li><NavLink className={({ isActive }) => isActive ? `${style.active}` : ``} to="/">Accueil</NavLink></li>
                        {!user &&
                            <li><NavLink className={({ isActive }) => isActive ? `${style.active}` : ``} to="login-register">Connexion/Inscription</NavLink></li>
                        }
                        <li><a target="_blank" href="mailto:gwendalftests+role_initiative@gmail.com">Contact</a></li>
                    </ul>
                    <ul className={`${style.footer_nav_content_socials}`}>
                        <li><Link target="_blank" to="https://twitter.com/?lang=en" title="Twitter"><XLogo /></Link></li>
                        <li><Link target="_blank" to="https://discord.com/" title="Discord"><DiscordLogo /></Link></li>
                    </ul>
                </div>
            </nav>
            <p className="page-width corpus-line-height">© Role Initiative 2023 - <Link to={"terms-of-service"}>Conditions générales d'utilisation</Link> - <Link to={"privacy-policy"}>Politique de confidentialité</Link> - <Link to={"legal-notices"}>Mentions Légales</Link></p>
        </footer>
    );
}
