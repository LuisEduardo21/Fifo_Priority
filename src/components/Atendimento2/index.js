import React from "react";
import { Clientes } from "../Clientes";

import "./styles.css";

//faz o mapeamento de clientes para ser atendido
function Atendente2({ filaAtendimento2 }) {
  return (
    <div id="containerAtendente2">
      <h1 id="h1">Atendente 2: </h1>
      <div>
        <div className="row">
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
    </div>
  );
}

export default Atendente2;
