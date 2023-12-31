import { Link } from "react-router-dom";
import style from "./PrivacyPolicy.module.scss";

export default function PrivacyPolicy() {
    return (
        <main>
            <section className={`page-width center-horizontal ${style.privacy_policy}`}>
                <h1>Politique de confidentialité</h1>
                <p>Role Initiative s'engage à ce que la collecte et le traitement de vos données soient conformes au réglement général sur la protection des données (RGPD) et à la <Link>loi informatique et Libertés</Link>.</p>
                <p>Role Initiative collecte et traite vos données à caractère personnel afin de vous permettre la création, la gestion et administration d'un compte utilisateur ainsi que de salons.</p>
                <p>Ces données ne sont destinées qu'à Role Initiative et ne sont donc pas destinées à être partagées. Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition sur vos données.</p>
                <p>Vous pouvez exercer vos droits en contactant le responsable du site par voie postale ou par email.</p>
                <p className={`${style.addresses}`}>
                    Responsable du site : Gwendal Mouvet <br />
                    Adresse : 45 rue du champ de fraises, 62138 DOUVRIN<br />
                    Email: <a target="_blank" rel="noreferrer" href="mailto:gwenmouv26@gmail.com">gwenmouv26@gmail.com</a>
                </p>
                <p>Vous disposez également du droit d'introduire une réclamation auprès de la CNIL.</p>
                <p>La CNIL, à l'attention du délégué à la protection des données (DPO)</p>
                <p className={`${style.addresses}`}>
                    3 Place de Fontenoy<br />
                    TSA 80715<br />
                    75334 PARIS Cedex 07
                </p>
                <h2>Cookies</h2>
                <p>Role Initiative utilise des cookies dans le but d'améliorer l'expérience de l'utilisateur et de lui permettre de rester connecté.</p>
            </section>
        </main>
    );
}
