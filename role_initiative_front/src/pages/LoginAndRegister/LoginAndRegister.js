import { useState } from 'react';
import style from "./LoginAndRegister.module.scss";
import Login from "../../components/Forms/Login/Login";
import Register from "../../components/Forms/Register/Register";
import { ReactComponent as D10_100 } from "../../assets/images/D10-100.svg";
import { ReactComponent as D12 } from "../../assets/images/D12.svg";
import { ReactComponent as D20 } from "../../assets/images/D20.svg";

export default function LoginAndRegister() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <main className={`${style.login_register_wrapper}`}>
            <section className={`page-width page-max-width center-horizontal ${style.login_register}`}>
                <div className={`${style.login}`}>
                    <label htmlFor="login">
                        <input id="login" name="login-register" type="radio" defaultChecked={!isChecked ? true : false} onClick={() => isChecked && setIsChecked(false)} />
                        <span>Connexion</span>
                    </label>
                    <Login />
                    <div className={`${style.login_visual}`}>
                        <D10_100 />
                        <D20 />
                        <D12 />
                    </div>
                </div>
                <div className={`${style.register}`}>
                    <label htmlFor="register">
                        <input id="register" name="login-register" type="radio" defaultChecked={isChecked ? true : false} onClick={() => !isChecked && setIsChecked(true)} />
                        <span>Inscription</span>
                    </label>
                    <Register />
                </div>
            </section>
        </main>
    );
}
