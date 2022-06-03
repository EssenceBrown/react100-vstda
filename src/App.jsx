import { times } from "lodash";
import React, { Component } from "react";
import AddTodo from "./components/AddTodo";
import ViewToDo from "./components/ViewToDo";
//import uuid from 'uuid';
// import { EvalDevToolModulePlugin } from 'webpack';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priority: null,
      text: "",
      listitems: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleViewTodoEdit = this.handleViewTodoEdit.bind(this);
    this.handleViewTodoDelete = this.handleViewTodoDelete.bind(this);
    this.handleEditChanges = this.handleEditChanges.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleClick(e) {
    const newTodo = {
      text: this.state.text,
      priority: this.state.priority,
      id: Date.now(),
      isEditing: false,
    };
    const newArray = [...this.state.listitems];
    newArray.push(newTodo);
    this.setState({
      listitems: newArray,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleEditChanges(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSave(id, text, priority) {
    console.log(id, text, priority);

    const newArray = [...this.state.listitems];
    const tempId = id;

    const index = newArray.findIndex((item) => item.id === tempId);

    newArray[index].isEditing = false;
    newArray[index].text = text;
    newArray[index].priority = priority;

    this.setState({
      listitems: newArray,
    });
  }

  handleViewTodoEdit(id) {
    const newArray = [...this.state.listitems];
    const tempId = id;

    const index = newArray.findIndex((item) => item.id === tempId);

    newArray[index].isEditing = true;

    this.setState({
      listitems: newArray,
    });
  }

  handleViewTodoDelete(id) {
    const newArray = [...this.state.listitems];
    const tempId = id;

    const index = newArray.findIndex((item) => item.id === tempId);

    newArray.splice(index, 1);
    this.setState({
      listitems: newArray,
    });
  }

  render() {
    return (
      <div>
        <div className="container">
        <div className='page-header border-bottom border-light'>
        <h2 className='text-white'>Very Simple Todo App</h2>
          <h6 className='text-white'>Track all of the things</h6>
          <hr />
         <br></br>
          <div className="form-group ">
            <div className="row">
              <div className="form col-md-4">
                <AddTodo
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                />
              </div>
              <div className="col-md-7">
                <div className="card">
                  <div className="card-header">View Todos</div>
                </div>
                {this.state.listitems.length > 0 &&
                  this.state.listitems.map((listitem, index) => {
                    let priority;
                    if (listitem.priority == 1) {
                      priority = "alert-success";
                    } else if (listitem.priority == 2) {
                      priority = "alert-warning";
                    } else if (listitem.priority == 3) {
                      priority = "alert-danger";
                    }
                    console.log(priority);

                    return (
                      <div className='col-md-8'>
                      <ViewToDo
                        id={listitem.id}
                        text={listitem.text}
                        priority={priority}
                        edit={this.handleViewTodoEdit}
                        delete={this.handleViewTodoDelete}
                        isEditing={listitem.isEditing}
                        save={this.onSave}
                      />
                      </div>
                    );
                  })}
                  
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
