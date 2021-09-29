import { useForm } from "react-hook-form";
export default function Input({ setUrl }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ url }) => setUrl(url);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Url"
        {...register("url", { required: true })}
      />

      <input type="submit" />
    </form>
  );
}
