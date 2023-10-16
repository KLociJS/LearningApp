import useDeleteArticle from "./Hooks/useDeleteArticle";

export default function DeleteArticleModalConatent({ id, setShow }) {
  const { isDisabled, hasFetchError, handleDeleteArticle } = useDeleteArticle(id);

  return (
    <section className="modal" onClick={(e) => e.stopPropagation()}>
      <h3 className="modal-header warning">Warning!</h3>
      <p className="modal-text mb-2">Article Deletion Is Irreversible!</p>
      {hasFetchError ? (
        <p className="error-msg">{`Couldn't delete article. Try again later`}</p>
      ) : null}
      <button className="warning-button" onClick={handleDeleteArticle} disabled={isDisabled}>
        Delete
      </button>
      <button className="secondary-button" onClick={() => setShow(false)} disabled={isDisabled}>
        Cancel
      </button>
    </section>
  );
}
