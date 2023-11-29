import style from "../../pages/Homepage/Homepage.module.scss";
import { ReactComponent as D20 } from "../../assets/images/D20.svg";
import { ReactComponent as ArgumentsIcon } from "../../assets/images/arguments_icon.svg";
// import { ReactComponent as Arrow } from "../../assets/images/arrow.svg";
import ButtonPhantom from "../Buttons/ButtonPhantom";

export default function Home() {
    return (
        <>
            <section className={`${style.hero}`}>
                <div className={`page-width page-max-width center-horizontal ${style.hero_wrapper}`}>
                    <div className={`${style.hero_wrapper_content}`}>
                        <h1 className={`${style.hero_wrapper_content_title}`}>LE PORTAIL VERS D'AUTRES PLANS</h1>
                        <p className={`${style.hero_wrapper_content_paragraph}`}>Role Initiative est une plateforme qui permet à quiconque de commencer ou continuer une partie de jeu de rôle et ce quelque soit votre niveau.</p>
                        <ButtonPhantom>Rejoindre</ButtonPhantom>
                    </div>
                    <D20 className={`${style.hero_wrapper_graphic}`} />
                </div>
            </section>
            <section className={`${style.arguments}`}>
                <div className={`page-width page-max-width center-horizontal ${style.arguments_wrapper}`}>
                    <div className={`${style.arguments_wrapper_visual}`}>

                    </div>
                    <div className={`${style.arguments_wrapper_content}`}>
                        <div className={`${style.arguments_wrapper_content_header}`}>
                            <h2>Partez à l'aventure</h2>
                            <ArgumentsIcon />
                        </div>
                    </div>
                </div>
            </section>
            <section className={`${style.about}`}>
                <article className={`page-width page-max-width center-horizontal ${style.about_wrapper}`}>
                    <div className={`${style.about_wrapper_visual}`}>

                    </div>
                    <div className={`${style.about_wrapper_content}`}>
                        <div className={`${style.about_wrapper_content_header}`}>
                            <h2>Role Initiative</h2>
                            <D20 />
                        </div>
                        <p>Notre existence à pour seul but de permettre à ceux et celles qui veulent commencer ou continuer leur voyage dans l'univers des jeux de rôle de ne pas se trouver limités par l'absence d'autres joueurs aux alentours, ou encore par le fait qu'un certain niveau soit attendu.</p>
                        <p>Les salons ont chacun leur niveau attendu pour la participation à une partie. Les nouveaux joueurs peuvent donc ainsi choisir un salon qui leur est adapté avec un maître du jeu qui sera là pour les guider, et les joueurs plus adeptes pourront quant à eux se retrouver avec des personnes tout autant expérimentées.</p>
                        <ButtonPhantom>Rejoignez-nous</ButtonPhantom>
                    </div>
                </article>
            </section>
        </>
    );
}
