import { useEffect } from 'react';
import Input from '../Input';

export default function UserNameInputWithValidation({
  inputValue,
  setInputValue,
  setError,
  error,
  isDisabled
}) {
  useEffect(() => {
    setError('');
  }, [inputValue, setError]);

  return (
    <>
      <Input
        label="User name"
        inputValue={inputValue}
        setInputValue={setInputValue}
        hasError={error}
        isDisabled={isDisabled}
      />
    </>
  );
}
