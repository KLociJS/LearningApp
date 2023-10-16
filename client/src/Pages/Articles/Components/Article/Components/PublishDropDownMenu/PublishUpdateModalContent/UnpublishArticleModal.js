import useUnpublishArticle from "./Hooks/useUnpublishArticle";

export default function UnpublishArticleModal({ setShow }) {
  const { unpublishHandler, fetchError, isDisabled } = useUnpublishArticle(setShow);

  return (
    <section className="modal">
      <h3 className="modal-header">Unpublish article</h3>
      {fetchError ? (
        <p className="error-msg">{`Couldn't unpublish article. Try again later`}</p>
      ) : null}
      <button className="warning-button" onClick={unpublishHandler} disabled={isDisabled}>
        Unpublish
      </button>
      <button className="secondary-button" onClick={() => setShow(false)} disabled={isDisabled}>
        Cancel
      </button>
    </section>
  );
}
