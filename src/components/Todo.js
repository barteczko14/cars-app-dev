import classes from "./Button.module.css";
import EditTodo from "./EditTodo";
const Todo = (props) => {

  return (
    <>
      <div className="todo-item">
        <hr />
        <span className={`${props.isChecked === true ? "done" : ""}`}>
          <div className="checker">
            <span className="">
              <input
                type="checkbox"
                defaultChecked={props.isChecked}
                name={props.id}
                onChange={(event) => props.checkHandler(event, props.todo)}
              />
            </span>
          </div>
          &nbsp;{props.todo}
          <br />
          <i>{new Date(props.timestamp.seconds * 1000).toLocaleString()}</i>
        </span>
        <div>
          <span className=" float-end mx-3">
            <EditTodo todo={props.todo} id={props.id} />
          </span>
          <button
            type="button"
            className={`${classes.btnDelete} float-end`}
            onClick={() => props.deleteTodo(props.id)}
          >
            Usuń
          </button>
        </div>
      </div>
    </>
  );
};
export default Todo;
