import React from "react";
import { useNavigate, Link } from "react-router-dom";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { userSignup } from "../store/authSlice";

export default function SignupPage() {
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
    confirmationPassword: "",
  });
  const [arePasswordsDiffer, setArePasswordsDiffer] = React.useState(false);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function changeCredentials<T extends keyof typeof credentials>(
    field: T,
    newValue: (typeof credentials)[T]
  ) {
    setCredentials((prev) => ({ ...prev, [field]: newValue }));
    if (field == "password" || field == "confirmationPassword") {
      setArePasswordsDiffer(false);
    }
  }

  React.useEffect(() => {
    if (auth.success) {
      navigate("/login");
    }
  }, [auth.success]);

  return (
    <div className="mx-auto mt-20 w-2/12 flex flex-col">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
        <Input
          name="username"
          label="Username"
          value={credentials.username}
          changeValue={(newValue) =>
            changeCredentials("username", String(newValue))
          }
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={credentials.password}
          changeValue={(newValue) =>
            changeCredentials("password", String(newValue))
          }
        />
        <Input
          name="confirmationPassword"
          label="Confirm password"
          type="password"
          value={credentials.confirmationPassword}
          changeValue={(newValue) =>
            changeCredentials("confirmationPassword", String(newValue))
          }
        />
        <Button
          text="Sign up"
          onClick={async () => {
            if (credentials.password != credentials.confirmationPassword) {
              setArePasswordsDiffer(true);
              return;
            }
            dispatch(
              userSignup({
                username: credentials.username,
                password: credentials.password,
              })
            );
          }}
        />
      </form>
      <Link to="/login">I already have account</Link>
      {auth.error && <span className="text-red-500">{auth.errorText}</span>}
      {arePasswordsDiffer && "Passwords are not matching."}
    </div>
  );
}
