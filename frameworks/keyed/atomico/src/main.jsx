import { c, useReducer, useEvent } from "atomico";
import { listReducer, initialState } from "./reducer.js";

const button = ({ id, cb, title }) => {
  return (
    <div staticNode class="col-sm-6 smallpad">
      <button
        type="button"
        class="btn btn-primary btn-block"
        id={id}
        onclick={cb}
      >
        {title}
      </button>
    </div>
  );
};

const jumbotron = () => {
  const dispatch = useEvent("ActionHeader", { bubbles: true });
  return (
    <host class="jumbotron">
      <div class="row">
        <div class="col-md-6">
          <h1>Atomico</h1>
        </div>
        <div class="col-md-6">
          <div class="row">
            {button({
              id: "run",
              title: "Create 1,000 rows",
              cb: () => dispatch("RUN"),
            })}
            {button({
              id: "runlots",
              title: "Create 10,000 rows",
              cb: () => dispatch("RUN_LOTS"),
            })}
            {button({
              id: "add",
              title: "append 1,000 rows",
              cb: () => dispatch("ADD"),
            })}
            {button({
              id: "update",
              title: "Update every 10th row",
              cb: () => dispatch("UPDATE"),
            })}
            {button({
              id: "clean",
              title: "Clear",
              cb: () => dispatch("CLEAR"),
            })}
            {button({
              id: "swaprows",
              title: "Swap Rows",
              cb: () => dispatch("SWAP_ROWS"),
            })}
          </div>
        </div>
      </div>
    </host>
  );
};

function tr({ selected, id, label }) {
  const dispatch = useEvent("ActionRow", { bubbles: true });
  return (
    <host class={selected ? "danger" : ""}>
      <td class="col-md-1" staticNode>
        {id}
      </td>
      <td class="col-md-4">
        <a onclick={() => dispatch({ type: "SELECT", id: id })}>{label}</a>
      </td>
      <td class="col-md-1" staticNode>
        <a onclick={() => dispatch({ type: "REMOVE", id: id })}>
          <span class="glyphicon glyphicon-remove" aria-hidden="true" />
        </a>
      </td>
      <td class="col-md-6" staticNode />
    </host>
  );
}

tr.props = {
  selected: Boolean,
  id: Number,
  label: String,
};

const Tr = c(tr, HTMLTableRowElement);

const Jumbotron = c(jumbotron, HTMLDivElement);

const main = () => {
  const [{ data, selected }, dispatch] = useReducer(listReducer, initialState);
  return (
    <host
      onActionRow={({ detail }) => dispatch(detail)}
      onActionHeader={({ detail: type }) => dispatch({ type })}
    >
      <div class="container">
        <Jumbotron renderOnce dispatch={dispatch}></Jumbotron>
        <table class="table table-hover table-striped test-data">
          <tbody>
            {data.map((item) => (
              <Tr
                key={item.id}
                id={item.id}
                selected={item.id === selected}
                label={item.label}
              ></Tr>
            ))}
          </tbody>
        </table>
        <span class="preloadicon glyphicon glyphicon-remove" staticNode />
      </div>
    </host>
  );
};

customElements.define("main-element", c(main));
customElements.define("main-element-jumbotron", Jumbotron, { extends: "div" });
customElements.define("main-element-tr", Tr, { extends: "tr" });
