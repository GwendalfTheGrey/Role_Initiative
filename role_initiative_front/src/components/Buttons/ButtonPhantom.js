import style from "./Buttons.module.scss";

export default function ButtonPhantom({ children }) {
    return (
        <button className={`${style.btn} ${style.btn_phantom}`}>{children}</button>
    );
}
