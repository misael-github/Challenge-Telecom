import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { AOS } from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const User = ({ user }) => {
  // console.log(user.userId)

  const navigate = useNavigate();

  

  // Modal
  const Modal = () => {
    Swal.fire({
      title: "¿Desea eliminar el usuario?",
      confirmButtonText: "Aceptar",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteUser(user.userId);
      }
    });
  };

  // Delete user
  const deleteUser = (userId) => {
    axios
      .post("https://telecom-challenge.herokuapp.com/api/user/delete-user", { userId: userId })
      .then((res) => {
        Swal.fire({
          title: "Usuario eliminado correctamente",
          icon: "success",
        });
        navigate(0);
      })
      .catch((err) => {
        console.log(err, `error al eliminar el user ${user.id}`);
      });
  };
  return (
    <>
      <tr>
        <td className="table__td">{user.dni}</td>
        <td className="table__td">{user.name}</td>
        <td className="table__td">{user.lastName}</td>
        <td className="table__td">{user.sex}</td>
        <td className="table__td">{user.phone}</td>
        <td className="table__td">
          <Link to={`/edit-user/${user.userId}`}>
            <Button className=" btn secondary" name="Editar"></Button>
          </Link>
        </td>
        <td className="table__td">
          <Button
            className="btn danger"
            name="Eliminar"
            onClick={Modal}
          ></Button>
        </td>
      </tr>
    </>
  );
};

export default User;
