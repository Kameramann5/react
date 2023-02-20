import React from "react";
import './modal.css'

export default class Modal extends React.Component {
    state = {isOpen:false}
    render()
    {
    return ( 
        <React.Fragment>
            <button className="btn btn-outline-primary btnmodal" onClick={()=>this.setState({isOpen:true})}>Открыть окно</button>
           {this.state.isOpen && (
             <div className='modal'>
                <div className='modal-body'>
<h2>Модальное окно</h2>
<p>Открылся компонент реакта.</p>
<button className="btn btn-outline-primary" onClick={()=>this.setState({isOpen:false})}>Закрыть</button>

                </div>
            </div>)}
        </React.Fragment>
    )
    }
}