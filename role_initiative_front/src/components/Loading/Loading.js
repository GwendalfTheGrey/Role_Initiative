import { useGenreAttribute } from "../../hooks/useGenreAttribute";
import style from "./Loading.module.scss";

export default function Loading() {
    useGenreAttribute(window.location.pathname.split("/")[1]);

    return (
        <div className={`${style.loader}`}></div>
    );
}
