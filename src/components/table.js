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

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Author",
        accessor: "author", // accessor is the "key" in the data
        Cell: ({ row }) => (
          <a
            href={`https://github.com/${row.values.author}`}
            target="_blank"
            rel="noreferrer"
          >
            {row.values.repo}
          </a>
        ),
      },
      {
        Header: "repo",
        accessor: "repo",
        Cell: ({ row }) => (
          <a
            href={`https://github.com/${row.values.author}/${row.values.repo}`}
            target="_blank"
            rel="noreferrer"
          >
            {row.values.repo}
          </a>
        ),
      },
      // {
      //   Header: "Url",
      //   accessor: "repoUrl",
      //   Cell: ({ row }) => (
      //     <a href={row.values.repoUrl} target="_blank" rel="noreferrer">
      //       {row.values.repoUrl}
      //     </a>
      //   ),
      // },
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
    axios
      .get("https://dependents-github-sever.herokuapp.com/sort", {
        params: {
          url: "https://github.com/tannerlinsley/react-query",
          type: "stars",
          start: 0,
          end: 10,
        },
      })
      .then((res) => {
        console.log(res.data);
        setState(res.data);
      });
  }, []);
  const data = useMemo(() => state, [state]);

  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
