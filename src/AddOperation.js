import React, { useState, useEffect } from "react";
import useLocalStorage from 'react-use-localstorage';
import axios from 'axios';
import qs from 'qs';
import xmlReader from 'xml-reader';

import './styles/App.css';

import { NavBar } from './components/NavBar';
import Scanner from './components/Scanner'

import cameraOn from "./icons/cameraOn.svg"
import cameraOff from "./icons/cameraOff.svg"

export default function () {
    const [codRota, setCodRota] = useState("");
    const [maquina, setMaquina] = useState("");

    const [cameraShow, setCameraShow] = useState(false);
    const [cameraList, setCameraList] = useState([]);

    const [cameraID, setCameraID] = useLocalStorage('cameraID', '');
    const [operador] = useLocalStorage('Operador', '');
    const [cnpj] = useLocalStorage('CNPJ', '');
    const [operacoes, setOperacoes] = useLocalStorage('Operacoes', '[]');

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1/api',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };

    const onDetected = codRota => {
        setCodRota(codRota)
        setCameraShow(false)
    };

    function listWebcams() {
        try {
            navigator.mediaDevices.enumerateDevices().then(function (devices) {
                setCameraList(devices)
            });
        } catch {
            setCameraList([])
        }

    }

    useEffect(() => {
        listWebcams()
    }, [cameraShow])

    const send = () => {
        var data = qs.stringify({
            'codRota': codRota,
            'maquina': maquina,
            'operador': operador,
            'tipo': 'inicio',
            'cnpjEmpresa': cnpj,
            'tipoParada': ''
        });

        axios({...config, data: data})
            .then(function (response) {
                if(xmlReader.parseSync(response.data) !== undefined){
                    setOperacoes(JSON.stringify([{
                        codRota: codRota,
                        maquina: maquina,
                        operador: operador,
                        cnpj: cnpj,
                        parado: false,
                    }, ...JSON.parse(operacoes)]))

                    window.location.href = '/'
                } else {
                    console.log(response)
                    alert("Parece que algo esta errado, certifique-se que esta tudo certo\n ERRO: "+ response.data)
                }
            })
            .catch(function (error) {
                alert("Ocorreu um erro ao tentar se conectar a API\nERRO: "+ error)
            });
    };

    return (
        <>
            <NavBar />
            <main>
                {cameraShow &&
                    <div id="cam">
                        <select onChange={(e) => { setCameraID(e.target.value) }} onClick={() => {listWebcams()}}>
                            <option disabled selected value> -- Selecione uma opção -- </option>
                            {cameraList.map(function (o, i) {
                                if (o.kind === "videoinput") {
                                    if (o.deviceId === cameraID) {
                                        return <option selected="selected" value={o.deviceId} key={i}>{o.label}</option>
                                    } else {
                                        return <option value={o.deviceId} key={i}>{o.label}</option>
                                    }
                                } else {
                                    return ""
                                }
                            })}
                        </select>
                        <Scanner onDetected={onDetected} id={cameraID} />
                    </div>
                }
                <div id="codigo">
                    <input type="text" placeholder="CODIGO" value={codRota} onChange={e => setCodRota(e.target.value)} />
                    <img id="cameraIcon" alt="Icone de camera" src={cameraShow ? cameraOff : cameraOn} onClick={() => { setCameraShow(!cameraShow) }} />
                </div>
                <input type="text" placeholder="MAQUINA" onChange={e => setMaquina(e.target.value)}></input>
                <input id="enviar" type="button" value="ENVIAR" onClick={() => send()} />
            </main>
        </>
    );
}
