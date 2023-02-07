import React, { useState, useEffect } from "react";
import '../styles/App.css';

import useLocalStorage from 'react-use-localstorage';
import { Link } from "react-router-dom";

export function NavBar() {
    const [operador, setOperador] = useLocalStorage('Operador', '');
    const [cnpj, setCnpj] = useLocalStorage('CNPJ', '');

    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (operador === "") {
            //window.location.href='/login'
            setLogin(true)
        }
    },[])

    return (
        <>
            {login &&
                <div id="login">
                    <div>
                        <p>Operador:</p>
                        <input type="text" value={operador} onChange={e => setOperador(e.target.value)} />
                    </div>
                    <div>
                        <p>CNPJ empresa:</p>
                        <input type="text" value={cnpj} onChange={e => setCnpj(e.target.value)} />
                    </div>
                    <input id="enviar" type="button" value="CONFIRMAR" onClick={() => setLogin(false)} />
                </div>
            }
            <header>
                <Link to="/">Início</Link>
                <span onClick={() => setLogin(true)}>Usuario: {operador}</span>
            </header>
        </>
    );
}
