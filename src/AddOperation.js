import React, { useState } from "react";
import useLocalStorage from 'react-use-localstorage';
import axios from 'axios';

import './styles/App.css';

import { NavBar } from './components/NavBar';
import Scanner from './components/Scanner'

export default function() {
    const [codRota, setCodRota] = useState("");
    const [maquina, setMaquina] = useState("");

    const [operador, setOperador] = useLocalStorage('Operador', '');
    const [cnpj, setCnpj] = useLocalStorage('CNPJ', '');

    const onDetected = codRota => {
        setCodRota(codRota)
    };

    const send = () => {
        axios.post('http://thingproxy.freeboard.io/fetch/http://cpro42729.publiccloud.com.br:5100/WebService1.asmx/inserirApontamento', {
            codRota: codRota,
            maquina: maquina,
            operador: operador,
            tipo: 'parada',
            cnpjEmpresa: cnpj,
            tipoParada: 'alomoco',
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    };
    
    return (
        <>
            <NavBar />
            <main>
                    <div id="cam">
                        <Scanner onDetected={onDetected} />
                    </div>
                    <input type="text" placeholder="CODIGO" value={codRota} onChange={e => setCodRota(e.target.value)}/>
                    <input type="text" placeholder="MAQUINA" onChange={e => setMaquina(e.target.value)}></input>
                    <input id="enviar" type="button" value="ENVIAR" onClick={() => send()}/>
            </main>
        </>
    );
}
