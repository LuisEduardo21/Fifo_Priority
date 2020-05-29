import React, {Componentes} from 'react';
import Fifo from '/.Fifo';

export default class Sistema extends Componentes{

    constructor(props){
        super(props)
        this.state = ({})
    }
    FifoActive = () => {
        this.state({});
    };

    render(){
        return <Fifo/>
    }

}