import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { userLogin } from "../store/authSlice";

export default function LoginPage() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  type T = keyof typeof credentials;

  function changeCredentials<T extends keyof typeof credentials>(
    field: T,
    newValue: (typeof credentials)[T] = ""
  ) {
    setCredentials((prev) => ({ ...prev, [field]: newValue }));
  }

  React.useEffect(() => {
    if (auth.logged) {
      navigate("/");
    }
  }, [auth.logged]);

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
        <Button
          text="Log in"
          onClick={() => {
            dispatch(
              userLogin({
                username: credentials.username,
                password: credentials.password,
              })
            );
          }}
        />
      </form>
      <Link to="/signup">I do not have account</Link>
      {auth.error && <span className="text-red-500">{auth.errorText}</span>}
    </div>
  );
}
