import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import HomeConnected from "../../components/HomeConnected/HomeConnected";
import Home from "../../components/Home/Home";

export default function Homepage() {
    const user = useContext(AuthContext);
    
    return (
        <main>
            {user ?
                <HomeConnected /> :
                <Home />
            }
        </main>
    );
}
