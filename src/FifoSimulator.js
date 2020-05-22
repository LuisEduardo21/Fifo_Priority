// Tempo Total do Sistema
let tempo = 0;

// Intervalos de Tempo
const INTERVALO_DO_SISTEMA = 1000;
const INTERVALO_FILA_NORMAL = 5000;
const INTERVALO_FILA_PRIORITARIA = 5000;
const INTERVALO_DE_ATENDIMENTO = 3000;

// Numeração das Pessoas
let numeracaoNormal = 0;
let numeracaoPrioritario = 0;

// Instanciação das filas
let filaN = []; // Fila Normal -> Começa vazia
let filaP = []; // Fila Prioritária -> Começa vazia
let finalizados = []; // Fila dos Atendimentos finalizados

const qtdPessoasQueChegaramNaFila = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Contador de Pessoas Atendidas
let contadorNormal = 0;
let contadorPrioritarios = 0;

// Variável que controla os Atendimentos
let controle = 0;

setInterval(() => {
  const pessoasNormaisQueChegaram = qtdPessoasQueChegaramNaFila(1, 5);

  for (let index = 0; index < pessoasNormaisQueChegaram; index++) {
    filaN.push(`n${++numeracaoNormal}`);
  }
}, INTERVALO_FILA_NORMAL);

setInterval(() => {
  const pessoasPrioritariasQueChegaram = qtdPessoasQueChegaramNaFila(0, 2);

  for (let index = 0; index < pessoasPrioritariasQueChegaram; index++) {
    filaP.push(`p${++numeracaoPrioritario}`);
  }
}, INTERVALO_FILA_PRIORITARIA);

setInterval(() => {
  if (filaN.length > 0 && controle < 3) {
    finalizados.push(filaN.shift());
    contadorNormal++;
    controle === 3 ? (controle = 0) : controle++;
  } else if (filaP.length > 0) {
    finalizados.push(filaP.shift());
    contadorPrioritarios++;
    controle === 3 ? (controle = 0) : controle++;
  }
}, INTERVALO_DE_ATENDIMENTO);

setInterval(() => {
  tempo++;
  console.log("Quantidade de Pessoas na Fila Normal: " + filaN.length);
  console.log("Quantidade de Pessoas na Fila Prioritária: " + filaP.length);
  console.log("Atendimentos Finalizados: " + finalizados.length);
  console.log("Atendimentos Normais Realizados: " + contadorNormal);
  console.log("Atendimentos Prioritários Realizados: " + contadorPrioritarios);
  console.log(finalizados);
  console.log("Tempo: " + tempo + " segundos\n");
}, INTERVALO_DO_SISTEMA);