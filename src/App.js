import './App.css';
import {useReducer} from 'react';

function App() {

  const reducer=(state,action)=>{
    switch (action.type){
      case 'addTodo':
        return {
          todos:[...state.todos,action.payload]
        };

        case 'deleteTodos':
          return {
            todos: state.todos.filter(
              (todos)=>todos.id!==action.payload
            ),
          };

      default:
        return state;

    }


  }

  const [state,dispatch]=useReducer(reducer,{todos:[]});

  const addTodo=(todos)=>{
    dispatch(
      {
        type:'addTodo',
        payload:todos,
      }
    );
  };

  const deleteTodo=(id)=>{
    dispatch(
      {
        type:'deleteTodos',
        payload:id,
      }
    );
  };


  return (
    <div className="App">

      <form 
      onSubmit={(e)=>{
        e.preventDefault();
        const title=e.target.elements.title.value;
        const details=e.target.elements.details.value;
        const id=new Date().getTime().toString();
        addTodo({id,title,details});
        e.target.reset();

      }}
      >

      <input 
       type="text"
       placeholder="Enter Todo Title"
       name="title">
      </input>
      <input 
       type="text"
       placeholder="Enter todo details"
       name="details">
      </input>

      <button type="submit">submit</button>

      </form>

      <div>
        <h2>Todo List</h2>

        <ul>
          {state.todos.map((todos)=>{
            return  <li key={todos.id}>{todos.title}-{todos.details}
            <button onClick={()=>deleteTodo(todos.id)}
            >Delete</button>
      
            </li>
          })}

        </ul>
      </div>


      
    </div>
  );
};

export default App;
