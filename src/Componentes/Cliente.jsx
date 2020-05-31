import React, {componentes} from 'react';

export default class Cliente extends Componentes{

    render(){
        return (
            <div className="d-inline-block" style={{ marginLeft: '5px'}}>
                <h3>
                    <span className="back badge-warning">
                        {this.props.text}
                    </span>
                </h3>

            </div>
        )
    }
}