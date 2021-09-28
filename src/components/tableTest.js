import { useTable } from "react-table";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";

export default function Table() {
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
  const columns = useMemo(
    () => [
      {
        Header: "Author",
        accessor: "author", // accessor is the "key" in the data
      },
      {
        Header: "repo",
        accessor: "repo",
      },
      {
        Header: "Url",
        accessor: "repoUrl",
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",

                  fontWeight: "bold",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
