import { NavLink, Link } from "react-router-dom";
import style from "./Footer.module.scss";
import { ReactComponent as LogoText } from "../../assets/images/logo-text.svg";
import { ReactComponent as LogoDice } from "../../assets/images/logo-dice.svg";
import { ReactComponent as XLogo } from "../../assets/images/x-logo.svg";
import { ReactComponent as DiscordLogo } from "../../assets/images/discord-logo.svg";

export default function Footer() {
    return (
        <footer>
            <nav className={`${style.footer_nav}`}>
                <NavLink className={`${style.footer_nav_logo}`} to="/">
                    <LogoText className={`${style.footer_nav_logo_text}`} />
                    <LogoDice className={`${style.footer_nav_logo_dice}`} />
                </NavLink>
                <div className={`${style.footer_nav_content}`}>
                    <ul className={`${style.footer_nav_content_links}`}>
                        <li><NavLink className={({isActive}) => isActive ? `${style.active}` : ``} to="/">Accueil</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? `${style.active}` : ``} to="login-register">Connexion/Inscription</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? `${style.active}` : ``} to="contact">Contact</NavLink></li>
                    </ul>
                    <ul className={`${style.footer_nav_content_socials}`}>
                        <li><Link target="_blank" to="https://twitter.com/?lang=en"><XLogo/></Link></li>
                        <li><Link target="_blank" to="https://discord.com/"><DiscordLogo/></Link></li>
                    </ul>
                </div>
            </nav>
            <p>© Role Initiative 2023 - <Link>Conditions générales</Link> - <Link>Politique de confidentialité</Link> - <Link>Mentions Légales</Link></p>
        </footer>
    );
}
