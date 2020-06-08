import React, { useState, useEffect } from "react";
import { Espera } from "../../components/Espera";
import Atendimento1 from "../../components/Atendimento1";
import Atendimento2 from "../../components/Atendimento2";

//import Clientes from '../../components/Clientes'
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

let countId = 0;

export function Sistema() {
  const [filaDeEspera, setFilaDeEspera] = useState([]);
  const [filaAtendimento1, setFilaAtendimento1] = useState([]);
  const [filaAtendimento2, setFilaAtendimento2] = useState([]);
  const [filaFinalizada, setFilaFinalizada] = useState([]);
  const [tempoMedioEspera, setTempoMedioEspera] = useState([]);

  const qtdPessoasQueChegaramNaFila = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const geraCliente = () => {
    const cliente = {};
    countId++;
    cliente.id = countId;
    cliente.genero = Math.random() >= 0.5 ? "m" : "f";
    cliente.prioridade = Math.random() >= 0.6; // 1 - 0.6 = 0.4 ou 40% de chance de ser TRUE (Prioritário)
    cliente.tempoEspera = 0;
    return cliente;
  };

  //ele gerencia a fila de Espera
  useEffect(() => {
    const interval = setInterval(() => {
      //adiciona 1 segundo no tempo de fila de espera de cada cliente
      if (filaDeEspera.length > 0) {
        filaDeEspera.forEach((cliente) => cliente.tempoEspera++);
        console.log(filaDeEspera);
      }
      if (filaDeEspera.length <= 9) {
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
    if (filaAtendimento1.length <= 0) {
      const interval = setInterval(() => {
        const cliente = filaDeEspera.shift();
        setFilaDeEspera([...filaDeEspera]);
        setFilaAtendimento1((filaAtendimento1) => [
          ...filaAtendimento1,
          cliente,
        ]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [filaDeEspera, filaAtendimento1]);

  //Gerencia a segunda fila de atendimento
  useEffect(() => {
    //Verificar se há cliente prioritario na fila
    if (filaAtendimento2.length <= 0) {
      const interval = setInterval(() => {
        filaDeEspera.sort(function (a, b) {
          return a.prioridade === b.prioridade ? 0 : a.prioridade ? -1 : 1;
        });
        const cliente = filaDeEspera.shift();
        setFilaDeEspera([...filaDeEspera]);
        setFilaAtendimento2((filaAtendimento2) => [
          ...filaAtendimento2,
          cliente,
        ]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [filaDeEspera, filaAtendimento2]);

  // Remove os clientes do atendimento 1
  useEffect(() => {
    const interval = setInterval(() => {
      const clienteAtendido = filaAtendimento1.shift();
      setFilaAtendimento1([...filaAtendimento1]);
      setFilaFinalizada((filaAtendimento1) => [
        ...filaAtendimento1,
        clienteAtendido,
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, [filaFinalizada, filaAtendimento1]);

  // Remove os clientes do atendimento 2
  useEffect(() => {
    const interval = setInterval(() => {
      const clienteAtendido2 = filaAtendimento2.shift();
      setFilaAtendimento2([...filaAtendimento2]);
      setFilaFinalizada((filaAtendimento2) => [
        ...filaAtendimento2,
        clienteAtendido2,
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, [filaFinalizada, filaAtendimento2]);

  useEffect(() => {
    const interval = setInterval(() => {
      //Tempo medio de fila de espera
      if (filaFinalizada.length > 0) {
        let contadorTempoMedio = 0;
        filaFinalizada.forEach(
          (cliente) =>
            (contadorTempoMedio +=
              cliente !== undefined ? cliente.tempoEspera : 0)
        );
        const tempoMedio = (contadorTempoMedio / filaFinalizada.length).toFixed(
          2
        );
        setTempoMedioEspera(tempoMedio);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="container-fluid">
      <div className="row col-lg-12">
        <div id="containerFilas" className="col-md-8">
          <Espera filaDeEspera={filaDeEspera}></Espera>
        </div>
        <div id="button" className=" col-md-4">
          <button
            type="button"
            class="btn btn-md btn-success"
            style={{ marginRight: 25 }}
          >
            Iniciar
          </button>
          <button
            type="button"
            class="btn btn-md btn-danger"
            style={{ marginRight: 25 }}
          >
            Pausar
          </button>
          <button type="button" class="btn btn-md btn-primary">
            Reiniciar
          </button>
        </div>
        {/* fila de atendimento1*/}
        <div className="row  col-lg-12">
          <div id="containerAtendente1" className="col-md-8">
            <Atendimento1 filaAtendimento1={filaAtendimento1}></Atendimento1>
          </div>

          <div id="metricas">
            <div className="col-md-auto">
              {/* Métricas */}
              <div id="titulo">
                <h5>Métricas</h5>
              </div>
              <div id="metricastxt">
                <span>
                  {"1) Tempo Médio de espera no sistema: "}
                  {Number(tempoMedioEspera) + 2}
                </span>
                <div></div>
                <span>{"2) Tempo Médio de Atendimento: 2 Segundos"}</span>
                <div></div>
                <span>
                  {"3) Tempo Médio de Espera na Fila: "}
                  {tempoMedioEspera}
                </span>
              </div>
            </div>
          </div>
          {/* fila de atendimento2 */}
          <div id="containerAtendente1" className="col-md-8">
            <Atendimento2 filaAtendimento2={filaAtendimento2}></Atendimento2>
          </div>
        </div>
      </div>
    </div>
  );
}
