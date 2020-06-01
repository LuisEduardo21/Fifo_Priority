import React, { useState, useEffect } from "react";
import { Espera } from "../../components/Espera";
import { Atendimento } from "../../components/Atendimento";
import { Finalizados } from "../../components/Finalizados";

import "./styles.css";

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
      if (filaDeEspera.length <= 8) {
        const qtdClientes = qtdPessoasQueChegaramNaFila(0, 2);
        for (let i = 0; i < qtdClientes; i++) {
          const cliente = geraCliente();
          setFilaDeEspera((filaDeEspera) => [...filaDeEspera, cliente]);
        }
      } else if (filaDeEspera.length === 9) {
        const cliente = geraCliente();
        setFilaDeEspera((filaDeEspera) => [...filaDeEspera, cliente]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [filaDeEspera]);

  return (
    <div>
      <div className="containerTitulo">
        <h1> Nhé Bank </h1>
      </div>
      <div className="containerFilas">
        <Espera filaDeEspera={filaDeEspera}></Espera>
        <Atendimento></Atendimento>
        <Finalizados></Finalizados>
      </div>
    </div>
  );
}
