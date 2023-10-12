import {
  AuthCard,
  EmailInputWithValidation,
  PasswordInputWithValidation,
  UserNameInputWithValidation
} from "Components";

import useSignUp from "./Hooks/useSignUp";

import { AiOutlineLogin } from "react-icons/ai";

export default function SingUp() {
  const {
    userName,
    setUserName,
    userNameError,
    setUserNameError,
    email,
    setEmail,
    emailError,
    setEmailError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    isDisabled,
    error,
    setError,
    handleSignup
  } = useSignUp();

  return (
    <>
      <main className="container card-container">
        <AuthCard icon={AiOutlineLogin} heading="Sign up" onSubmit={handleSignup}>
          <UserNameInputWithValidation
            inputValue={userName}
            setInputValue={setUserName}
            error={userNameError}
            setError={setUserNameError}
            isDisabled={isDisabled}
          />
          <PasswordInputWithValidation
            inputValue={password}
            setInputValue={setPassword}
            error={passwordError}
            setError={setPasswordError}
            isDisabled={isDisabled}
          />
          <EmailInputWithValidation
            inputValue={email}
            setInputValue={setEmail}
            error={emailError}
            setError={setEmailError}
            isDisabled={isDisabled}
          />

          {error && (
            <p key={error} className="error-msg align-start">
              {error}
            </p>
          )}
          <button className="primary-button mt-2" type="submit" disabled={isDisabled}>
            SignUp
          </button>
        </AuthCard>
      </main>
    </>
  );
}
