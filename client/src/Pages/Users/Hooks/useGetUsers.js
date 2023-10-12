import { useEffect, useState } from "react";

import { getUsers } from "_Constants";

export default function useGetUsers() {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(getUsers, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.userDtos);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    users,
    setUsers,
    isLoaded
  };
}
