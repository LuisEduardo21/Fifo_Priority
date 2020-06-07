import React from "react";
import { Clientes } from "../Clientes";
import "./styles.css";

function Atendente2({ filaAtendimento2 }) {
  return (
    <div>
      <h1 id="h1">Atendente 2: </h1>
      <div id="containerAtendente2">
        {filaAtendimento2.length > 0 &&
          filaAtendimento2.map((item) => (
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

export default Atendente2;
