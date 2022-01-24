import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/styles.css";
import Logo from "./assets/logofinalalternative.png";

const initialState = {
  todos: [],
  filter: "all",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "todo/add":
      const id = Math.random().toString(36);
      return {
        ...state,
        todos: state.todos.concat({ id, ...action.payload }),
      };

    case "todo/complete":
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      return {
        ...state,
        todos: newTodos,
      };
    case "filter/set":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};
const selectTodos = (state) => {
  const { todos, filter } = state;

  if (filter === "complete") {
    return todos.filter((todo) => todo.completed);
  }

  if (filter === "incomplete") {
    return todos.filter((todo) => !todo.completed);
  }

  return todos;
};

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <li
      style={{
        fontSize: 20,
        listStyle: "circle",
        textDecoration: todo.completed ? "line-through" : "none",
        position: "relative",
        marginBottom: 10,
        color: "white",
        cursor: "pointer",
        inlineSize: 700,
        overflowWrap: "break-word",
      }}
      key={todo.id}
      onClick={() => dispatch({ type: "todo/complete", payload: todo })}
    >
      {todo.title}
    </li>
  );
};
function App() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      return;
    }
    const todo = { title: value, completed: false };
    dispatch({ type: "todo/add", payload: todo });
    setValue("");
  };
  const DeleteItems = (indexItem) => {
    setValue((todos) => todos.filter((index) => index !== indexItem));
  };

  return (
    <div className="max-container">
      <div className="navbar">
        <div className="container">
          <a href="#" className="logo">
            <img src={Logo} width={100} />
          </a>
          <form onSubmit={submit}>
            <input
              className="input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Escribir..."
            />
          </form>
        </div>
      </div>

      <div className="row">
        <div className="item-container">
          <div className="card" id="todos">
            <div className="btn-container">
              <button
                className="btn"
                onClick={() => dispatch({ type: "filter/set", payload: "all" })}
              >
                Todos
              </button>
              <button
                className="btn"
                onClick={() =>
                  dispatch({ type: "filter/set", payload: "complete" })
                }
              >
                Completados
              </button>
              <button
                className="btn"
                onClick={() =>
                  dispatch({ type: "filter/set", payload: "incomplete" })
                }
              >
                Incompletos
              </button>
              <button
                className="btn"
                onClick={() =>
                  dispatch({ type: "filter/set", payload: "borrar" })
                }
              >
                Borrar
              </button>
            </div>
            <ul className="ul">
              {todos.map((todo) => (
                <TodoItem className="item" key={todo.id} todo={todo} />
              ))}
              <button onClick={() => DeleteItems(todos)}>Borrar</button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
