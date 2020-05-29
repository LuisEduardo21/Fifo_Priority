import React, {Componentes } from 'react';
import Cliente from './Cliente';
import Atendimento from './Atendimento';

//tempo total do sistema
let Tempo = 0;
let eventoIntervalo = null;
let filaIntervalo = null;


export default class Fifo extends Componentes {
    constructor(props){
        super(props);
            this.state = this._initialState();
    }
    _initialState = () => {
        return {
            pausa = true, //estado em que sistem se encontra(pausado ou não)
            fila = [],
            filap = [],
            tempoDeAtendimento: 0,
            tempoMaximoDeAtendimento: 10,
            tamanhoDaFila: '',
            tempoMS: 0, //tempo medio no sistema
            tempoMAT: 0, //tempo medio no atendimento
            tempoMF: 0, //tempo medio de fila
            MAX_RANDOM: 5,
            numeroDeAtendentes: 3,
            btnText: 'Iniciar Sistema',
        };
            
    }
    _iniciarAtendimento = () => {

        let incTime = () => {
            let {pausa} = this.state;
            let fila = this.state.fila;

            if(!pausa && fila.length >= 1) {
                if (tempoDeAtendimento === 0){
                    tempoDeAtendimento = fila[0];
                    let atendimento = [ fila[0] ];

                    fila.splice(0, 1);

                    this.setState({
                        fila : fila,
                        atendimento : atendimento,
                        tamanhoDaFila : this._getTamanhoDaFilaText()
                    }, function(){});
                }
                this.setState ({ tempoDeAtendimento: tempoDeAtendimento }, () => {
                    tempoDeAtendimento -= 1;
                })
            }
        }
        eventoIntervalo = setInterval(incTime, 1000);
    }
    _gerenciarFila = () => {
        filaIntervalo = setInterval (() => {
            let { fila, pausa, tempoMaximoDeAtendimento } = this.state;
             //verificação do sistema 
            if(!pausa){
              //Random adicionar os eventos na fila
              let random = Math.floor(Math.random() * MAX_RANDOM) + 1;
              //vai adicionar os eventos
              for (let i = 0; i < random; ++i){
                  let eventoTime = Math.floor(Math.random() * tempoMaximoDeAtendimento) + 1;
                  fila.push(eventoTime)
              }
              //seta o estado
              this.setState({
                  fila: fila,
                  fila
              })
            }
        })
    }
}

