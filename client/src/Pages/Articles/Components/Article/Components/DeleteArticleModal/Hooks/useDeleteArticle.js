import { deleteArticle } from "_Constants/fetchUrl";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import filterDeletedArticle from "./Utility/filterDeletedArticle";

export default function useDeleteArticle(id) {
  const navigate = useNavigate();
  const { setSidebarContent } = useOutletContext();
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasFetchError, setHasFetchError] = useState(false);

  const handleDeleteArticle = () => {
    setIsDisabled(true);
    fetch(`${deleteArticle}${id}`, { method: "DELETE", credentials: "include" })
      .then((res) => res.json())
      .then(() => {
        setSidebarContent((content) => filterDeletedArticle(id, content));
        navigate("/article");
      })
      .catch((err) => {
        setHasFetchError(true);
        console.log(err);
      })
      .finally(() => setIsDisabled(false));
  };

  return {
    isDisabled,
    hasFetchError,
    handleDeleteArticle
  };
}
