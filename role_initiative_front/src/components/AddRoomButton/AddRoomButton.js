import { Link } from "react-router-dom";

export default function AddRoomButton() {
    return (
        <Link className="add-room" to="new-room"><span>+</span><span>Ajouter un salon</span></Link>
    );
}
