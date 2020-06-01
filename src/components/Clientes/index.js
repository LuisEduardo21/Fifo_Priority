import React from "react";
import icClientes from "../../assets/clientes";

import "./styles.css";

export function Clientes({ id, genero, prioridade }) {
  const defineIcone = (genero, prioridade) => {
    if (prioridade) {
      return genero === "m" ? icClientes[2] : icClientes[3];
    } else {
      return genero === "m" ? icClientes[0] : icClientes[1];
    }
  };

  return (
    <>
      <div className="containerCliente">
        <img
          src={defineIcone(genero, prioridade)}
          alt="Ícone representando um Cliente do Banco"
        ></img>
        <p>{id}</p>
      </div>
    </>
  );
}
