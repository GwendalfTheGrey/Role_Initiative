import style from "./TermsOfService.module.scss";

export default function TermsOfService() {
    return (
        <main>
            <section className={`page-width center-horizontal ${style.tos}`}>
                <h1>Conditions générales d'utilisation</h1>
                <p>Role Initiative est un plateforme qui a pour but de permettre à ceux et celles voulant jouer à des jeux de rôle de pouvoirs se retrouver en distanciel par le biais de salons. La création de salons permet de mettre en place un jeu de rôle avec lequel un genre va de paire, son descriptif ainsi qu'un niveau minimum attendu de la part de tout utilisateur voulant rejoindre un salon.</p>
                <article>
                    <h2>Utilisateurs</h2>
                    <p>À son inscription, un utilisateur peut choisir d'être simple joueur ou joueur et maître du jeu. Seuls les maîtres du jeu peuvent créer, démarrer, arrêter ou supprimer leurs salons. L'administrateur peut, si un salon ne se conforme pas aux règles qui suivent, supprimer tout salon selon son bon jugement. Les joueurs peuvent quant à eux rejoindre tout salon correspondant à ou en dessous de leur niveau et n'étant pas encore en cours, ils peuvent à tout moment quitter un salon préalablement rejoint.</p>
                    <p>En s'inscrivant à Role Initiative, tout utilisateur s'engage à :</p>
                    <ul>
                        <li>maintenir le caractère confidentiel de ses identifiants de connexion,</li>
                        <li>utiliser le site conformément à sa destination (les salons de jeu de rôle ne doivent en aucun avoir pour but un caractère sexuel, raciste, sexiste, incitant à la violence, ... Les jeux de rôle doivent rester des "jeux de rôle"),</li>
                        <li>ne pas tenter de nuire au bon fonctionnement du site.</li>
                    </ul>
                    <h2>Propriété intellectuelle</h2>
                    <p>Les éléments du site sont protégés par le droit de la propriété intellectuelle (droit d'auteur) et leur utilisation sans le consentement de l'éditeur est interdite</p>
                    <p>Le logo, les textes et les éléments graphiques présents dans la structure générale du site sont la propriété exclusive de Gwendal Mouvet.</p>
                    <ul>
                        <li>Les informations figurant sur le site sont uniquement disponibles à des fins de consultation par les utilisateurs, à défaut d'un accord préalable et exprès.</li>
                        <li>Si les utilisateurs sont maîtres du jeu, il est de leur droit de modifier les éléments dont ils sont à l'origine</li>
                        <li>Toute utilisation totale ou partielle du site ou de son contenu, par quelque procédé que ce soit ou sur quelque support que ce soit, à des fins commerciales ou publicitaires, est interdite et engage la responsabilité de l'utilisateur.</li>
                    </ul>
                    <h2>Éditeur du site</h2>
                    <p>L'éditeur du site, Gwendal mouvet, n'est pas responsable en cas de problèmes dus à des liens hypertextes, vers des sources extérieures ou en cas de problème technique.</p>
                    <p>L'éditeur n'est aucunement responsable de tout publication erronée ou injurieuse dont les utilisateurs sont à l'origine.</p>
                </article>
            </section>
        </main>
    );
}
