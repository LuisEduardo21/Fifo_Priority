import React, {componentes} from react;

export default class Atendimento extends Componentes{
    render(){
        return(
        <div class = "d-inline-block" style={{marginLeft: '5px'}}>
            <h3>
                <span className="badge badge-primary">
                    {this.props.text}
                </span>
                <p>oi</p>
            </h3>

        </div>
        )
    }

}