import { deleteUser } from "_Constants";
import { useState } from "react";

export default function useDeleteUser() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasFetchError, setHasFetchError] = useState(false);

  const handleDeleteUser = (id, setUsers) => {
    setIsDisabled(true);
    fetch(`${deleteUser}${id}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(() => {
        setUsers((users) => users.filter((u) => u.id !== id));
      })
      .catch((error) => {
        if (error instanceof Response) {
          error.json().then((msg) => console.log(msg));
        } else {
          console.log(error);
        }
        setHasFetchError(true);
      })
      .finally(() => setIsDisabled(false));
  };
  return {
    handleDeleteUser,
    isDisabled,
    hasFetchError
  };
}
