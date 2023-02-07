import useLocalStorage from 'react-use-localstorage';

import { Link } from "react-router-dom";
import './styles/App.css';

import { NavBar } from './components/NavBar';
import { Operation } from './components/Operation';


import plus from "./icons/plus.svg"

export default function() {

    const [operacoes, setOperacoes] = useLocalStorage('Operacoes', '[]');

    return (
        <>
            <NavBar />
            <main>
                {JSON.parse(operacoes).map(function(o, i) {
                    return <Operation key={i} info={o} setOperacoes={setOperacoes} operacoes={operacoes}/>
                })}
                <Link to="/AddOperation" className="operation" id="add">
                        <span>INICIAR</span>
                        <button id="plus"><img src={plus} /></button>
                </Link>
            </main>
        </>
    );
}
