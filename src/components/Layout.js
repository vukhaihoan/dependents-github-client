import { useState } from "react";
import Input from "./form";
import DepenTable from "./table";
export default function Layout() {
  let [url, setUrl] = useState("");
  return (
    <div>
      <Input setUrl={setUrl} />
      <DepenTable url={url} />
    </div>
  );
}
