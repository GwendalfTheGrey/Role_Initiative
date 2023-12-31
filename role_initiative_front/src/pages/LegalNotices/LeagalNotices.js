import { Link } from "react-router-dom";
import style from "./LeagalNotices.module.scss";

export default function LeagalNotices() {
    return (
        <main>
            <section className={`page-width center-horizontal ${style.legal_notices}`}>
                <h1>Mentions légales</h1>
                <p>Conformément aux dispositons des articles 6-III et 19 de la <Link to="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164">loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique</Link>, il est porté à la connaissance des utilisateurs du site "", les présentes mentions légales.</p>
                <article>
                    <h2>Édition, développement et intégration du site</h2>
                    <p className={`${style.addresses}`}>
                        Responsable du site : Gwendal Mouvet <br />
                        Adresse : 45 rue du champ de fraises, 62138 DOUVRIN<br />
                        Téléphone : 06.44.07.00.58<br />
                        Email: <a target="_blank" rel="noreferrer" href="mailto:gwenmouv26@gmail.com">gwenmouv26@gmail.com</a>
                    </p>
                </article>
                <article>
                    <h2>Hébergement du site</h2>
                    <p className={`${style.addresses}`}>
                        Nom de l'hébergeur : Vercel Inc.<br />
                        Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789<br />
                        Numéro de téléphone : (559) 288-7060<br />
                        Email : <a target="_blank" rel="noreferrer" href="mailto:privacy@vercel.com">privacy@vercel.com</a>
                    </p>
                </article>
                <article>
                    <h2>Réutilisation du contenu</h2>
                    <p>Les contenus du site constituant des œuvres originales sont soumis à la législation en vigeur sur le droit de l'auteur et sont la propriété exclusive de leurs auteurs respectifs. Toute reproduction et rediffusion de tout ou partie de ces contenus sont soumises à l'autorisation préalable, écrite et expresse du ou des titulaires de ces droits.</p>
                    <p>Le logo, les textes et les éléments graphiques présents dans la structure générale du site sont la propriété exclusive de Gwendal Mouvet.</p>
                    <p>La publication ou l'utilisation des textes, éléments graphiques, etc publiés sur ce site est autorisée pour un usage personnel et privé sous réserve des droits des tiers. Toute reproduction ou utilisation de ces éléments à d'autres fins (notamment commerciales) est strictement interdite.</p>
                </article>
                <article>
                    <h2>Politique de confidentialité</h2>
                    <p>Role Initiative s'engage à ce que la collecte et le traitement des données, effectués sur le site, soient conformes au règlement général sur la protection des données (RGPD).</p>
                </article>
            </section>
        </main>
    );
}
