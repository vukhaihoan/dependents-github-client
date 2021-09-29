import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import MaUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useTable } from "react-table";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
}

function DpenTable({ url }) {
  const columns = useMemo(
    () => [
      {
        Header: "Dependents",
        accessor: "author", // accessor is the "key" in the data
        Cell: ({ row }) => (
          <div>
            <a
              href={`https://github.com/${row.values.author}`}
              target="_blank"
              rel="noreferrer"
            >
              {row.values.author}
            </a>
            {" / "}
            <a
              href={`https://github.com/${row.values.author}/${row.values.repo}`}
              target="_blank"
              rel="noreferrer"
            >
              {row.values.repo}
            </a>
          </div>
        ),
      },
      {
        accessor: "repo",
        Cell: ({ row }) => {
          return null;
        },
        Header: () => null,
      },
      {
        Header: "stars",
        accessor: "stars",
      },

      {
        Header: "forks",
        accessor: "forks",
      },
    ],
    []
  );

  const [state, setState] = useState([]);
  useEffect(() => {
    if (url) {
      axios
        .get("https://dependents-github-sever.herokuapp.com/sort", {
          params: {
            url: url,
            type: "stars",
            start: 0,
            end: 10,
          },
        })
        .then((res) => {
          console.log(res.data);
          setState(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [url]);
  const data = useMemo(() => state, [state]);

  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  );
}

export default DpenTable;
