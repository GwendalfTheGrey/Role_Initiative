import style from "./Rooms.module.scss";

export default function Rooms({ children }) {
    return (
        <main>
            <section className={`page-width page-max-width center-horizontal ${style.rooms_wrapper}`}>
                {children}
            </section>
        </main>
    );
}
