import useDeleteUser from "./Hooks/useDeleteUser";

export default function DeleteUserModalContent({ user, setUsers, setShow }) {
  const { handleDeleteUser, isDisabled, hasFetchError } = useDeleteUser();

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div>
        <h1 className="modal-header warning">Delete user</h1>
        <p className="mb-1">Deleting a user is irreversible!</p>
      </div>
      {hasFetchError ? (
        <p className="error-msg">{`Couldn't delete user. Try again later`}</p>
      ) : null}
      <button
        onClick={() => handleDeleteUser(user.id, setUsers)}
        className="warning-button"
        disabled={isDisabled}>
        Delete
      </button>
      <button onClick={() => setShow(false)} className="secondary-button" disabled={isDisabled}>
        Close
      </button>
    </div>
  );
}
