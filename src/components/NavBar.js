import '../styles/App.css';

import useLocalStorage from 'react-use-localstorage';
import { Link } from "react-router-dom";

export function NavBar() {
    const [operador, setOperador] = useLocalStorage('Operador', '');

    if(operador === ""){
        window.location.href='/login'
    }

    return (
        <header>
            <Link to="/">Home</Link>
            <Link to="/login">Usuario: {operador}</Link>
        </header>
    );
}
