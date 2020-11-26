import React, {useState} from 'react';
//import './App.css';
import {AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {useRef} from 'react';


function App() {
  const [todo, setTodo]= useState({desc:'', date:'', priority:''});
  const [todos, setTodos]= useState([]);

const inputChanged= (event) => {
  setTodo({...todo, [event.target.name]: event.target.value});
}

const addTodo = (event) => {
  event.preventDefault();
 setTodos([...todos, todo]);

}

const gridRef = useRef ();

const deleteTodo = () => {
  setTodos(todos.filter(( todo, index) =>  
  index!==gridRef.current.getSelectedNodes()[0].childIndex))
}
  
const columns = [
  {headerName: 'Date', field: 'date', sortable: true, filter: true},
  {headerName: 'Description', field: 'desc', sortable: true, filter: true},
  {headerName: 'Priority', field: 'priority',sortable: true, filter: true,
cellStyle: params => params.value === "High" ? {color:'red'}:params.value === "Medium" ?  {color:'blue'}:{color:'black'}}
]
  return (
    <div className="App">
    <header className="App-header" >ToDoList</header> 
    <fieldset> 
      <legend>Add todo: </legend> 
    <input type="date" name="date" value={todo.date} onChange={inputChanged}></input>
    <input type="text" name="desc" value={todo.desc} onChange={inputChanged}></input>
    <input type="text" name="priority" value={todo.priority} onChange={inputChanged}></input>
    <span> </span>
    <button onClick={addTodo}>Add</button>
    <button onClick={deleteTodo}>Delete</button>
    </fieldset> 
    <div className='ag-theme-material' 
    style={{height:"700px", width:"80%", margin:"auto"}}>
    <AgGridReact
      ref={gridRef}
      onGridReady={ params=>  gridRef.current= params.api}
      rowSelection="single"
      columnDefs={columns}
      rowData={todos}
      >
    </AgGridReact>
    </div>
    </div>
  );
}

export default App;
