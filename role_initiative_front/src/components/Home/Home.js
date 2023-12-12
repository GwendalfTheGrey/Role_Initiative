import style from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as D4 } from "../../assets/images/D4.svg";
import { ReactComponent as D6 } from "../../assets/images/D6.svg";
import { ReactComponent as D8 } from "../../assets/images/D8.svg";
import { ReactComponent as D10_100 } from "../../assets/images/D10-100.svg";
import { ReactComponent as D12 } from "../../assets/images/D12.svg";
import { ReactComponent as D20 } from "../../assets/images/D20.svg";
import { ReactComponent as ArgumentsIcon } from "../../assets/images/arguments_icon.svg";
import { ReactComponent as Arrow } from "../../assets/images/arrow.svg";

export default function Home() {
    const navigate = useNavigate();

    const redirection = () => {
        navigate("/login-register");
    };

    return (
        <>
            <section className={`${style.hero}`}>
                <div className={`page-width center-horizontal ${style.hero_wrapper}`}>
                    <div className={`${style.hero_wrapper_content}`}>
                        <h1 className={`${style.hero_wrapper_content_title}`}>LE PORTAIL VERS D'AUTRES PLANS</h1>
                        <p className={`${style.hero_wrapper_content_paragraph}`}>Role Initiative est une plateforme qui permet à quiconque de commencer ou continuer une partie de jeu de rôle et ce quelque soit votre niveau.</p>
                        <button onClick={redirection} className="btn btn-phantom" type="button">Rejoindre</button>
                    </div>
                    <D20 className={`${style.hero_wrapper_visual}`} />
                </div>
            </section>
            <section className={`${style.arguments}`}>
                <article className={`page-width center-horizontal ${style.arguments_wrapper}`}>
                    <div className={`${style.arguments_wrapper_visual}`}>
                        <D8 />
                        <D20 />
                        <D6 />
                        <D10_100 />
                    </div>
                    <div className={`${style.arguments_wrapper_content}`}>
                        <div className={`${style.arguments_wrapper_content_header}`}>
                            <h2>Partez à l'aventure</h2>
                            <ArgumentsIcon />
                        </div>
                        <ul className={`${style.arguments_wrapper_content_list}`}>
                            <li className="corpus-line-height"><Arrow />Créez ou rejoignez un salon existant et retrouvez des personnes qui comme vous ne cherchent qu'à partir à l'aventure.</li>
                            <li className="corpus-line-height"><Arrow />Chaque salon à un niveau d'expérience attendu pour y entrer. Cela vous permet de jouer avec des personnes qui elles aussi commencent leurs aventures ou continuent leur ascension vers les sommets.</li>
                            <li className="corpus-line-height"><Arrow />Vous pouvais choisir de parcourir les salons en fonction du type d'aventure que vous cherchez (magique, futuriste, effrayante, ...). Les salons peuvent aussi être filtrés par leur intitulé, le nom du créateur du salon ou encore par le niveau minimum attendu pour les rejoindre.</li>
                            <li className="corpus-line-height"><Arrow />Retrouvez les salons de jeux en cours dans lesquels vous vous trouvez sur votre page profil. Vous y trouverez aussi le nombre de parties complétées vous permettant ainsi de suivre votre progrès.</li>
                        </ul>
                    </div>
                </article>
            </section>
            <section className={`${style.about}`}>
                <article className={`page-width center-horizontal ${style.about_wrapper}`}>
                    <div className={`${style.about_wrapper_visual}`}>
                        <D10_100 />
                        <D4 />
                        <D20 />
                        <D12 />
                    </div>
                    <div className={`${style.about_wrapper_content}`}>
                        <div className={`${style.about_wrapper_content_header}`}>
                            <h2>Role Initiative</h2>
                            <D20 />
                        </div>
                        <p>Notre existence à pour seul but de permettre à ceux et celles qui veulent commencer ou continuer leur voyage dans l'univers des jeux de rôle de ne pas se trouver limités par l'absence d'autres joueurs aux alentours, ou encore par le fait qu'un certain niveau soit attendu.</p>
                        <p>Les salons ont chacun leur niveau attendu pour la participation à une partie. Les nouveaux joueurs peuvent donc ainsi choisir un salon qui leur est adapté avec un maître du jeu qui sera là pour les guider, et les joueurs plus adeptes pourront quant à eux se retrouver avec des personnes tout autant expérimentées.</p>
                        <button onClick={redirection} className="btn btn-phantom" type="button">Rejoignez-nous</button>
                    </div>
                </article>
            </section>
        </>
    );
}
