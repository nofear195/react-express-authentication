import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

type FormValues = {
  email: RegExp;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  // const { errors } = formState;
  const { login, isLoading } = useLogin();

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    login({ ...data }, { onSettled: () => reset() });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        id="email"
        category="vertical"
        label="Email address"
        error={errors?.email?.message}
      >
        <input
          className="input"
          type="email"
          autoComplete="username"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow
        id="password"
        category="vertical"
        label="Password"
        error={errors?.password?.message}
      >
        <input
          className="input"
          type="password"
          autoComplete="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password needs a minimum of 6 characters",
            },
          })}
        />
      </FormRow>
      <FormRow category="vertical">
        <button type="reset" onClick={() => reset}>
          reset
        </button>
        <button type="submit">log in</button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
