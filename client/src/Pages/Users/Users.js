import "./Users.css";

import { Modal, ModalTriggerElement } from "Components";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteUserModalContent from "./Components/DeleteUserModal/DeleteUserModalContent";
import RolesModalContent from "./Components/RolesModal/RolesModalContent";
import UsersSkeleton from "./Components/Skeleton/UsersSkeleton";
import useGetUsers from "./Hooks/useGetUsers";

export default function Users() {
  const { users, setUsers, isLoaded } = useGetUsers();

  if (!isLoaded) {
    return <UsersSkeleton />;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr className="table-row">
            <th className="table-data">Name</th>
            <th className="table-data">Roles</th>
            <th className="table-data table-hidden">Email</th>
            <th className="table-data"></th>
            <th className="table-data"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr className="table-row" key={u.id}>
              <td className="table-data">{u.userName}</td>
              <td className="table-data">{u.roles.join(", ")}</td>
              <td className="table-data table-hidden max-width">{u.email}</td>
              <td className="table-data">
                <Modal
                  modalContent={<RolesModalContent user={u} setUsers={setUsers} />}
                  triggerElement={
                    <ModalTriggerElement
                      text={<AiOutlineEdit className="edit-icon" />}
                      className="modal-button"
                    />
                  }
                />
              </td>
              <td className="table-data">
                <Modal
                  modalContent={<DeleteUserModalContent user={u} setUsers={setUsers} />}
                  triggerElement={
                    <ModalTriggerElement
                      text={<RiDeleteBinLine className="delete-icon" />}
                      className="modal-button"
                    />
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
