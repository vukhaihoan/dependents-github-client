/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isIdle, isLoading, isError, data, error, refetch, isFetching } =
    useQuery(
      "todos",
      () =>
        axios
          .get(
            "https://api.github.com/repos/tannerlinsley/react-query/contributors?per_page=1"
          )
          .then((res) => res.data),
      {
        enabled: false,
      }
    );

  return (
    <>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {isIdle ? (
        "Not ready..."
      ) : isLoading ? (
        <span>Loading...</span>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <div>{isFetching ? "Fetching..." : null}</div>
            {console.log(data)}
            <ReactQueryDevtools initialIsOpen />
          </div>
        </>
      )}
    </>
  );
}
