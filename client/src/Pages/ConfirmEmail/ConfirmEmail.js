import { Loading } from "Components";
import { BiError } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

import useConfirmEmail from "./Hooks/useConfirmEmail";

import "./ConfirmEmail.css";

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const { error, isLoaded } = useConfirmEmail(email, token);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <>
      {error ? (
        <div className="full-width-container">
          <BiError className="error-icon" />
          <div>
            <h1 className="heading-2">Sorry, something went wrong!</h1>
            <p className="paragraph-light">Try again later.</p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
