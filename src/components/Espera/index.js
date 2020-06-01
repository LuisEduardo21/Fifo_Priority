import React from "react";
import { Clientes } from "../Clientes";

import './styles.css';

export function Espera({ filaDeEspera }) {
  return (
    <div className="containerEspera">
      <p>Fila de Espera</p>
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
  );
}
