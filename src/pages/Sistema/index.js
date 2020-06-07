import React, { useState, useEffect } from "react";
import { Espera } from "../../components/Espera";
import Atendimento1 from "../../components/Atendimento1";
import Atendimento2 from '../../components/Atendimento2';

//import Clientes from '../../components/Clientes'
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

let countId = 0;

export function Sistema() {
  const [filaDeEspera, setFilaDeEspera] = useState([]);
  const [filaAtendimento1, setFilaAtendimento1] = useState([]);
  const [filaAtendimento2, setFilaAtendimento2] = useState([]);

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
   
  //ele gerencia a fila de espera
  useEffect(() => {
    const interval = setInterval(() => {
      if (filaDeEspera.length <= 10) {
        const qtdClientes = qtdPessoasQueChegaramNaFila(0, 2);
        for (let i = 0; i < qtdClientes; i++) {
          const cliente = geraCliente();
          setFilaDeEspera((filaDeEspera) => [...filaDeEspera, cliente]);
        }
      } else if (filaDeEspera.length === 9) {
        const cliente = geraCliente();
        setFilaDeEspera((filaDeEspera) => [...filaDeEspera, cliente]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [filaDeEspera]);
    
  //gerencia a primeira fila de atendimento
  useEffect(() => {
    const interval = setInterval(() => {
      const cliente = filaDeEspera.shift();
      setFilaDeEspera([...filaDeEspera]);
      setFilaAtendimento1((filaAtendimento1) => [...filaAtendimento1, cliente]);
    }, 2000);
    return () => clearInterval(interval);
  }, [filaDeEspera, filaAtendimento1]);
  
  //Gerencia a segunda fila de atendimento
  useEffect(() => {
    const interval2 = setInterval(() => {
      const cliente = filaDeEspera.shift();
      setFilaDeEspera([...filaDeEspera]);
      setFilaAtendimento2((filaAtendimento2) => [...filaAtendimento2, cliente]);
      console.log(filaAtendimento2);
    }, 2000);
    return () => clearInterval(interval2);
  }, [filaDeEspera, filaAtendimento2]);

  return (
    <div className="container-fluid">
      <div className="row col-lg-12">
        <div id="containerFilas" className="col-md-8">
          <Espera filaDeEspera={filaDeEspera}></Espera>
        </div>
        <div id="button" className=" col-lg-4">
          <button
            type="button"
            class="btn btn-md btn-success btn-lg"
            style={{ marginRight: 25 }}
          >
            Iniciar
          </button>
          <button type="button" class="btn btn-md btn-danger btn-lg">
            Pausar
          </button>
        </div>
      </div>
      {/* fila de atendimento1*/}
      <div className="row  col-lg-12">
        <div id="containerAtendente1" className="col-md-8">
          <Atendimento1 filaAtendimento1={filaAtendimento1}></Atendimento1> 
            {/* fila de atendimento2 */}
      <Atendimento2
      filaAtendimento2={filaAtendimento2}>
      </Atendimento2>
        </div>
        <div className=" col-lg-4">
          {/* Métricas */}
          <div id="titulo">
            {" "}
            <h5>Métricas</h5>
          </div>
          <div id="metricas">
            <span>{"1) Ritmo Médio de Chegada: "}</span>
            <div></div>
            <span>{"2) Tempo Médio de Atendimento: "}</span>
            <div></div>
            <span>{"3) Tempo Médio de Espera na Fila: "}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="row  col-lg-12">
          <div id="containerAtendente2" className="col-md-8"></div>
        </div>
      </div>
    </div>
  );
}
