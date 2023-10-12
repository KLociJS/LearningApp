import useAuth from "Hooks/useAuth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { login } from "_Constants";

export default function useLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false);

  const { setUser } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const userCredentials = { userName, password };
    setIsDisabled(true);
    fetch(`${login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(userCredentials)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((response) => {
        const { roles, userName } = response;

        const Identity = {
          userName,
          roles,
          unAuthorized: false
        };

        setIsDisabled(false);
        setUser(Identity);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setIsDisabled(false);
        if (error instanceof Response) {
          error.json().then((errorData) => {
            setError(errorData.description);
          });
        } else {
          console.error("Error:", error);
        }
      });
  };

  return {
    userName,
    setUserName,
    password,
    setPassword,
    error,
    setError,
    isDisabled,
    handleLogin
  };
}
