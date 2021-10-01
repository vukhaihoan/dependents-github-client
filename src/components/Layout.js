import { useState } from "react";
import Input from "./form";
import DepenTable from "./table";
export default function Layout() {
  let [state, setState] = useState({
    url: "",
    start: 0,
    end: 10,
  });
  return (
    <div>
      <Input setState={setState} />
      <DepenTable stateInput={state} />
    </div>
  );
}
