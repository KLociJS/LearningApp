import useUpdateRoles from "./Hooks/useUpdateRoles";

export default function RolesModalContent({ user, setUsers, setShow }) {
  const { roles, setRoles, hasFetchError, setHasFetchError, isDisabled, handleUpdateRoles } =
    useUpdateRoles(setShow);

  const handleChange = (role) => {
    if (roles.includes(role)) {
      setRoles((roles) => roles.filter((r) => r !== role));
    } else {
      setRoles((roles) => [...roles, role]);
    }
  };

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h1 className="modal-hading">Change Roles</h1>
      <div>
        <p>
          Username: <strong>{user.userName}</strong>
        </p>
        <p>Current roles:</p>
        <p>
          <strong>{user.roles.join(", ")}</strong>
        </p>
      </div>
      <div className="role-inputs">
        <div>
          <input type="checkbox" id="admin" onChange={() => handleChange("Admin")} />
          <label htmlFor="admin">Admin</label>
        </div>
        <div>
          <input type="checkbox" id="moderator" onChange={() => handleChange("Moderator")} />
          <label htmlFor="moderator">Moderator</label>
        </div>
        <div>
          <input type="checkbox" id="author" onChange={() => handleChange("Author")} />
          <label htmlFor="author">Author</label>
        </div>
        <div>
          <input type="checkbox" id="user" onChange={() => handleChange("User")} />
          <label htmlFor="user">User</label>
        </div>
      </div>
      {hasFetchError ? (
        <p className="error-msg">{`Couldn't change roles. Try again later`}</p>
      ) : null}
      <button
        onClick={() => handleUpdateRoles(user, setUsers)}
        className="primary-button"
        disabled={isDisabled}>
        Save
      </button>
      <button onClick={(e) => setShow(false)} className="secondary-button" disabled={isDisabled}>
        Close
      </button>
    </div>
  );
}
