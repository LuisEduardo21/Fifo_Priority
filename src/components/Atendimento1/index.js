import React from "react";
import { Clientes } from "../Clientes";

import "./styles.css";

function Atendente1({ filaAtendimento1 }) {
  return (
    <div>
      <h1 id="h1">Atendente 1: </h1>
      <div>
        <div id="containerAtendente1" className="row">
          {filaAtendimento1.length > 0 &&
            filaAtendimento1.map((item) => (
              <Clientes
                key={item.id}
                id={item.id}
                genero={item.genero}
                prioridade={item.prioridade}
              ></Clientes>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Atendente1;
