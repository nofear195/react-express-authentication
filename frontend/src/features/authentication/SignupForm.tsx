import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  fullName: string;
  email: RegExp;
  password: string;
  passwordConfirm: string;
};

function SignupForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<FormValues>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) =>
    console.log(data);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        id="fullName"
        category="vertical"
        label="Full name"
        error={errors?.fullName?.message}
      >
        <input
          className="input"
          type="text"
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow
        id="email"
        category="vertical"
        label="Email address"
        error={errors?.email?.message}
      >
        <input
          className="input"
          type="email"
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
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow
        id="passwordConfirm"
        category="vertical"
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <input
          className="input"
          type="password"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value: string) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow category="vertical">
        <button type="reset" onClick={() => reset}>
          rest{" "}
        </button>
        <button type="submit">sign up</button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
