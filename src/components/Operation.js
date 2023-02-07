import React, { useState, useEffect } from "react";
import axios from 'axios';
import qs from 'qs';
import xmlReader from 'xml-reader';

import '../styles/App.css';

import pause from "../icons/pause.svg"
import check from "../icons/check.svg"
import refresh from "../icons/refresh.svg"

export function Operation({ info, setOperacoes, operacoes }) {
  const [showModal, setShowModal] = useState(false);
  const [motivo, setmotivo] = useState(false);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://192.168.0.10:5100/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };

  const parar = () => {
    setShowModal(false)

    var data = qs.stringify({
      'codRota': info.codRota,
      'maquina': info.maquina,
      'operador': info.operador,
      'tipo': 'parada',
      'cnpjEmpresa': info.cnpj,
      'tipoParada': motivo
    });

    axios({...config, data: data})
      .then(function (response) {
        if (xmlReader.parseSync(response.data) !== undefined) {
          setOperacoes(JSON.stringify(
            JSON.parse(operacoes).map(e => {
              if (e.codRota == info.codRota) {
                return { ...e, parado: true }
              } else {
                return e
              }
            })
          ))
        } else {
          console.log(response)
          alert("Parece que algo esta errado, certifique-se que esta tudo certo\n ERRO: " + response.data)
        }
      })
      .catch(function (error) {
        alert("Ocorreu um erro ao tentar se conectar a API\nERRO: " + error)
      });
  };

  const voltar = () => {
    var data = qs.stringify({
      'codRota': info.codRota,
      'maquina': info.maquina,
      'operador': info.operador,
      'tipo': 'volta',
      'cnpjEmpresa': info.cnpj,
      'tipoParada': ''
    });

    axios({...config, data: data})
      .then(function (response) {
        if (xmlReader.parseSync(response.data) !== undefined) {
          setOperacoes(JSON.stringify(
            JSON.parse(operacoes).map(e => {
              if (e.codRota == info.codRota) {
                return { ...e, parado: false }
              } else {
                return e
              }
            })
          ))
        } else {
          console.log(response)
          alert("Parece que algo esta errado, certifique-se que esta tudo certo\n ERRO: " + response.data)
        }
      })
      .catch(function (error) {
        alert("Ocorreu um erro ao tentar se conectar a API\nERRO: " + error)
      });
  };

  const finalizar = () => {
    var data = qs.stringify({
      'codRota': info.codRota,
      'maquina': info.maquina,
      'operador': info.operador,
      'tipo': 'finalizar',
      'cnpjEmpresa': info.cnpj,
      'tipoParada': ""
    });

    axios({...config, data: data})
      .then(function (response) {
        if (xmlReader.parseSync(response.data) !== undefined) {
          setOperacoes(JSON.stringify(
            JSON.parse(operacoes).filter(e => e.codRota !== info.codRota)
          ))
        } else {
          console.log(response)
          alert("Parece que algo esta errado, certifique-se que esta tudo certo\n ERRO: " + response.data)
        }
      })
      .catch(function (error) {
        alert("Ocorreu um erro ao tentar se conectar a API\nERRO: " + error)
      });
  };

  return (
    <div className="operation">
      <span>{info.codRota}</span>
      <div className="operationBtn">
        {info.parado ?
          <button onClick={() => voltar()} id="refresh"><img src={refresh} /></button> :
          <>
            <button onClick={() => setShowModal(true)}><img src={pause} /></button>
            <button onClick={() => finalizar()}><img src={check} /></button>
          </>
        }
      </div>
      {showModal &&
        <div className="modal" onClick={() => setShowModal(false)}>
          <div onClick={e => e.stopPropagation()}>
            <span>Motivo:</span>
            <input type="text" onChange={e => setmotivo(e.target.value)} />
          </div>
          <input type="button" value="Enviar" onClick={e => { e.stopPropagation(); parar() }} />
        </div>
      }
    </div>
  );
}
