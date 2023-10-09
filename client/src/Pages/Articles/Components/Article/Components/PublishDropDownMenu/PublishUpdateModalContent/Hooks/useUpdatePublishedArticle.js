import { updatePublishedArticle } from "_Constants/fetchUrl";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useArticle from "../../../../../../../../Hooks/useArticle";

export default function useUpdatePublishedArticle(setShow) {
  const { id } = useParams();
  const { description: oldDescription, tags: oldTags, setTags: setContextTags } = useArticle();
  const [tags, setTags] = useState(oldTags);
  const [description, setDescription] = useState(oldDescription);

  const updatePublishHandler = () => {
    const updatedArticleDetails = {
      tags: tags.split(","),
      description
    };
    fetch(`${updatePublishedArticle}${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(updatedArticleDetails)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setShow(false);
        console.log(tags);
        setContextTags(tags);
      })
      .catch((err) => console.log(err));
  };

  return {
    tags,
    setTags,
    description,
    setDescription,
    updatePublishHandler
  };
}
