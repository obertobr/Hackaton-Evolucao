const express = require('express');
var cors = require('cors')
const path = require('path');
const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }))

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

app.post('/api', function (req, res, next) {
  console.log(req.body)

  var urlencoded = new URLSearchParams();
  urlencoded.append("codRota", req.body.codRota);
  urlencoded.append("maquina", req.body.maquina);
  urlencoded.append("operador", req.body.operador);
  urlencoded.append("tipo", req.body.tipo);
  urlencoded.append("cnpjEmpresa", req.body.cnpjEmpresa);
  urlencoded.append("tipoParada", req.body.tipoParada);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch("http://cpro42729.publiccloud.com.br:5100/WebService1.asmx/inserirApontamento", requestOptions)
    .then(response => response.text())
    .then(result => res.send(result))
    .catch(error => console.log('error', error));
});

app.get(['/','/Home','/AddOperation'],function(req,res){
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname+'/build/'+req.originalUrl))
});
 

app.listen(80, function () {
  console.log('App está escutando na porta 80!');
});