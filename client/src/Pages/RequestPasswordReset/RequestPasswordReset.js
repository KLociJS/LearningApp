import { AuthCard, EmailInputWithValidation } from 'Components';

import { useRequestPasswordReset } from 'Hooks';
import { FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function RequestPasswordReset() {
  const navigate = useNavigate();
  const { handleResetPassword, email, setEmail, error, setError, isDisabled } =
    useRequestPasswordReset(navigate);

  return (
    <>
      <main className="container card-container">
        <AuthCard icon={FiLock} heading="Reset Password" onSubmit={handleResetPassword}>
          <p>Click the link received in email to reset password</p>
          <EmailInputWithValidation
            inputValue={email}
            setInputValue={setEmail}
            error={error}
            setError={setError}
          />
          <Link to="/login" className="link align-end">
            Back to login
          </Link>
          <button className="primary-button mt-2" type="submit" disabled={isDisabled}>
            Send email
          </button>
        </AuthCard>
      </main>
    </>
  );
}
