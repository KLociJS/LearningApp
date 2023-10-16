import { useState } from "react";

import { changeRole } from "_Constants";

export default function useUpdateRoles(setShow) {
  const [roles, setRoles] = useState([]);
  const [hasFetchError, setHasFetchError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleUpdateRoles = (user, setUsers) => {
    setIsDisabled(true);
    fetch(`${changeRole}${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ roles })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((response) => {
        setUsers((users) => {
          let updatedUser = users.find((u) => u.id === user.id);
          user.roles = roles;
          return [...users.filter((u) => u.id !== user.id), updatedUser];
        });
        setShow(false);
      })
      .catch((error) => {
        setHasFetchError(true);
        if (error instanceof Response) {
          error.json().then((errorData) => {
            console.log(errorData);
          });
        } else {
          console.error("Error:", error);
        }
      })
      .finally(() => setIsDisabled(false));
  };

  return {
    roles,
    setRoles,
    hasFetchError,
    isDisabled,
    handleUpdateRoles
  };
}
