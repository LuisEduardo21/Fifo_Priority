import React from "react";
import { Clientes } from "../Clientes";

import "./styles.css";

/// faz o mapeamento para inserir o cliente na fila
export function Espera({ filaDeEspera }) {
  return (
    <div id="containerEspera">
      <h1 id="h1">Cliente(s) na fila de espera: </h1>
      <div id="containerClientesEspera" className="row">
        {filaDeEspera.length > 0 &&
          filaDeEspera.map((item) => (
            <Clientes
              key={item.id}
              id={item.id}
              genero={item.genero}
              prioridade={item.prioridade}
            ></Clientes>
          ))}
      </div>
    </div>
  );
}
