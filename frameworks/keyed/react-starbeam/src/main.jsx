import { useReactiveSetup } from "@starbeam/react";
import ReactDOM from "react-dom/client";
import React, { StrictMode } from 'react';

import { Jumbotron } from './jumbotron';
import { TableData } from './data';

function Row({ id, label, selected, table }) {
  return (
    <tr className={selected ? "danger" : ""}>
      <td className="col-md-1">{id}</td>
      <td className="col-md-4">
        <a onClick={() => table.select(id)}>{label}</a>
      </td>
      <td className="col-md-1">
        <a onClick={() => table.remove(id)}>
          <span className="glyphicon glyphicon-remove" aria-hidden="true" />
        </a>
      </td>
      <td className="col-md-6" />
    </tr>
  )
}

function Main() {
  return useReactiveSetup(() => {
    const table = new TableData();

    return () => {
      let selected = table.selected;

      return (
        <div className="container">
          <Jumbotron table={table} />

          <table className="table table-hover table-striped test-data">
            <tbody>
              {table.data.map(({ id, label }) =>
                <Row
                  key={id}
                  {...{ id, label, table, selected: selected === id }}
                />
              )}
            </tbody>
          </table>

          <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true" />
      </div>
      );
    };
  });
}


let main = document.getElementById('main')


let root = ReactDOM.createRoot(main);
root.render(
  <StrictMode>
    <Main />
  </StrictMode>
);
