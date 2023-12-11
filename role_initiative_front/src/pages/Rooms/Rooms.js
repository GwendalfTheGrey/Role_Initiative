import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import style from "./Rooms.module.scss";

export default function Rooms({ children }) {
    const { user } = useContext(AuthContext);

    return (
        <main>
            <section className={`page-width page-max-width center-horizontal ${style.rooms_wrapper}`}>
                {children}
                
                {user.admin || user.GM ?
                    <div className="add-room"></div> :
                    ""
                }
            </section>
        </main>
    );
}
