import useLocalStorage from 'react-use-localstorage';

import './styles/App.css';

export default function() {

    const [operador, setOperador] = useLocalStorage('Operador', '');
    const [cnpj, setCnpj] = useLocalStorage('CNPJ', '');
    
    return (
        <div id="login">
            <div>
                <p>Operador:</p>
                <input type="text" value={operador} onChange={e => setOperador(e.target.value)}/>
            </div>
            <div>
                <p>CNPJ empresa:</p>
                <input type="text" value={cnpj} onChange={e => setCnpj(e.target.value)}/>
            </div>
            <input id="enviar" type="button" value="CONFIRMAR" onClick={() => window.location.href='/'}/>
        </div>
    );
}
