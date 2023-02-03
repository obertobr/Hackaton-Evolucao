import { Link } from "react-router-dom";
import './styles/App.css';

import { NavBar } from './components/NavBar';
import { Operation } from './components/Operation';


import plus from "./icons/plus.svg"

export default function() {
    return (
        <>
            <NavBar />
            <main>
                <Operation />
                <Operation />
                <Link to="/AddOperation" className="operation" id="add">
                        <span>INICIAR</span>
                        <button id="plus"><img src={plus} /></button>
                </Link>
            </main>
        </>
    );
}
