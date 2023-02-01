import '../styles/App.css';

import home from '../icons/home.png';

import useLocalStorage from 'react-use-localstorage';
import { Link } from "react-router-dom";

export function NavBar() {
    const [operador, setOperador] = useLocalStorage('Operador', '');

    if(operador === ""){
        window.location.href='/login'
    }

    return (
        <header>
            <Link to='/'><img>{home}</img></Link>
            <Link to="/login">Usuario: {operador}</Link>
        </header>
    );
}
