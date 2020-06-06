import React, { useState, useEffect } from "react";
import { Espera } from "../../components/Espera";
//import { Atendimento} from '../../components/Atendimento'
// import Atendimento1 from '../../components/Atendimento/Atendente1;'
//import Atendente2 from '../../components/Atendimento/Atendente2/index;'
//import { Finalizados } from "../../components/Finalizados";

// import Atendimento1 from '../../components/Atendimento1'
// import Atendimento2 from '../../components/Atendimento2'

//import Clientes from '../../components/Clientes'
import  'bootstrap/dist/css/bootstrap.css';
import  "./styles.css";

let countId = 0;

export function Sistema() {
  const [filaDeEspera, setFilaDeEspera] = useState([]);

  const qtdPessoasQueChegaramNaFila = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const geraCliente = () => {
    const cliente = {};
    countId++;
    cliente.id = countId;
    cliente.genero = Math.random() >= 0.5 ? "m" : "f";
    cliente.prioridade = Math.random() >= 0.7; // 1 - 0.7 = 0.3 ou 30% de chance de ser TRUE (Prioritário)
    return cliente;
  };

  useEffect(() => {
    
    const interval = setInterval(() => {

      if (filaDeEspera.length <= 30) {
        const qtdClientes = qtdPessoasQueChegaramNaFila(0, 2);
        for (let i = 0; i < qtdClientes; i++) {
          const cliente = geraCliente();
          setFilaDeEspera((filaDeEspera) => [...filaDeEspera, cliente]);
        }
      } else if (filaDeEspera.length === 9) {
        const cliente = geraCliente();
        setFilaDeEspera((filaDeEspera) => [...filaDeEspera, cliente]);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [filaDeEspera]);

  return (
    <div className="container-fluid" >
      <div className="row col-lg-12"  >
      <div id="containerFilas" className="col-md-8" >
        <Espera 
        filaDeEspera={filaDeEspera}>
        </Espera>
      </div>
      <div id="button" className=" col-lg-4">
        <button type="button" class="btn btn-md btn-success btn-lg" style= {{marginRight:25}}>Iniciar</button>
        <button type="button" class="btn btn-md btn-danger btn-lg" >Pausar</button>

        </div>
      </div>
     {/* Duplicação */}
      <div className="row  col-lg-12"  >
      <div id="containerAtendente1" className="col-md-8" >
        <Espera
        filaDeEspera={filaDeEspera}>
        </Espera>
      </div>
      <div className=" col-lg-4">
        {/* Métricas */}
        <div id="titulo"> <h5>Métricas</h5>
      </div>
        <div id="metricas">
        <span >
                  {'1) Ritmo Médio de Chegada (Lambda): '}
                </span>
                <div></div>
          <span>
                  {'2) Tempo Médio de Atendimento: '}
                </span>
                <div></div>
          <span>
                  {'3) Tempo Médio de Espera na Fila: '}
                </span>
                </div>
      </div>
      </div>
    {/* Duplicação */}
      <div>
      <div className="row  col-lg-12" >
      <div id="containerAtendente2" className="col-md-8" >
        <Espera
        filaDeEspera={filaDeEspera}>
        </Espera>
      </div>
      </div>
      </div>
    </div>
  );
}
