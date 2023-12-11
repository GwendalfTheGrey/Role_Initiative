import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import style from "./LoginAndRegister.module.scss";
import Login from "../../components/Forms/Login/Login";
import Register from "../../components/Forms/Register/Register";

export default function AdminLoginAndRegister() {
    const [adminPresent, setAdminPresent] = useState(useLoaderData());
    const adminSigningScreen = true;

    return (
        <main className={`${style.login_register_wrapper}`}>
            <section className={`page-width page-max-width center-horizontal ${style.login_register}`}>
                {
                    adminPresent &&
                    <div className={`${style.login}`}>
                        <label htmlFor="login">
                            <input id="login" name="login-register" type="radio" defaultChecked />
                            <span>Connexion Admin</span>
                        </label>
                        <Login adminSigningScreen={adminSigningScreen} />
                    </div>
                }
                {
                    !adminPresent &&
                    <div className={`${style.register}`}>
                        <label htmlFor="register">
                            <input id="register" name="login-register" type="radio" defaultChecked />
                            <span>Inscription Admin</span>
                        </label>
                        <Register adminSigningScreen={adminSigningScreen} setAdminPresent={setAdminPresent} />
                    </div>
                }
            </section>
        </main>
    );
}
