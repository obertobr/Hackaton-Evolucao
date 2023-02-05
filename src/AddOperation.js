import React, { useState, useEffect} from "react";
import useLocalStorage from 'react-use-localstorage';
import axios from 'axios';

import './styles/App.css';

import { NavBar } from './components/NavBar';
import Scanner from './components/Scanner'

import cameraOn from "./icons/cameraOn.svg"
import cameraOff from "./icons/cameraOff.svg"

export default function() {
    const [codRota, setCodRota] = useState("");
    const [maquina, setMaquina] = useState("");

    const [cameraShow, setCameraShow] = useState(false);
    const [cameraList, setCameraList] = useState([]);
    const [cameraID, setCameraID] = useLocalStorage('cameraID', '');
    //const [cameraID, setCameraID] = useState("");

    const [operador, setOperador] = useLocalStorage('Operador', '');
    const [cnpj, setCnpj] = useLocalStorage('CNPJ', '');

    const onDetected = codRota => {
        setCodRota(codRota)
    };

    function listWebcams() {
        navigator.mediaDevices.enumerateDevices().then(function (devices) {
            setCameraList(devices)
        });    
    }

    useEffect(() => {
        listWebcams()
    },[cameraShow])

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
                    {cameraShow &&
                    <div id="cam">
                        <select onChange={(e) => {setCameraID(e.target.value)}}>  
                            {cameraList.map(function(o, i) {
                                if(o.kind == "videoinput"){
                                    if(o.deviceId === cameraID){
                                        return <option selected="selected" value={o.deviceId} key={i}>{o.label}</option>
                                    } else {
                                        return <option value={o.deviceId} key={i}>{o.label}</option>
                                    }
                                }
                            })}
                        </select>  
                        <Scanner onDetected={onDetected} id={cameraID} />
                    </div>
                    }
                    <div id="codigo">
                        <input type="text" placeholder="CODIGO" value={codRota} onChange={e => setCodRota(e.target.value)}/>
                        <img id="cameraIcon" src={cameraShow ? cameraOff : cameraOn } onClick={() => {setCameraShow(!cameraShow)}}/>
                    </div>
                    <input type="text" placeholder="MAQUINA" onChange={e => setMaquina(e.target.value)}></input>
                    <input id="enviar" type="button" value="ENVIAR" onClick={() => send()}/>
            </main>
        </>
    );
}
