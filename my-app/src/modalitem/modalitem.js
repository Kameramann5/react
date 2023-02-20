import React from "react";
import "./modalitem.css";
import PropTypes from "prop-types";

export default class Modalitem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  handleEditTodo(value, value2) {
    this.props.onEdit(value, value2)
  }

  render() {
    const { title } = this.props;
    const { title2 } = this.props;

    return (
      <>
        <button
          className="btn btn-outline-primary btnitem"
          onClick={() => this.setState({ isOpen: true })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
        </button>
        {this.state.isOpen && (
          <div className="modal">
          
            <div className="modal-body">
          <h2>Просмотр задачи</h2>
            <div class="mb-3">
  <label htmlfor="exampleFormControlInput1" className="form-label">
  {this.props.todo.title?.length ? (
                <p>Название: </p>
              ) : (
                <p>Название отсутствует</p>
              )} 
  
  
  
  </label>
  <input type="text" class="form-control" id="exampleFormControlInput1" 
  value={this.props.todo.title}
                onChange={(e) => this.handleEditTodo(e.currentTarget.value, this.props.todo.title2)}

  />
</div>
<div class="mb-3">
  <label htmlfor="exampleFormControlTextarea1" className="form-label">
   {this.props.todo.title2?.length ? (
                <p>Описание: </p>
              ) : (
                <p>Описание отсутствует</p>
              )} 
  
  </label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
    value={this.props.todo.title2}
                onChange={(e) => this.handleEditTodo(this.props.todo.title, e.currentTarget.value)}
  
  ></textarea>
</div>



        
           {/* <p>Описание: {this.props.todo.title2}</p> */}
             

              {/* <h2>Задача: {this.props.todo.title}</h2> */}

              {/* {this.props.todo.title2?.length ? (
                <p>Описание: {this.props.todo.title2}</p>
              ) : (
                <p>Описание отсутствует</p>
              )} */}

              <button
                className="btn btn-outline-primary"
                onClick={() => this.setState({ isOpen: false })}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
