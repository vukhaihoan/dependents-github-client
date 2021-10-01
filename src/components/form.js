import { useForm } from "react-hook-form";
import Input from "@mui/material/Input";
export default function FormUrl({ setState }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ url, start, end }) =>
    setState({ url, start: Number(start), end: Number(end) });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Url"
        {...register("url", { required: true })}
      />
      <Input
        type="number"
        placeholder="Etart"
        {...register("start", { required: true })}
      />
      <Input
        type="number"
        placeholder="End"
        {...register("end", { required: true })}
      />
      <input type="submit" />
    </form>
  );
}
