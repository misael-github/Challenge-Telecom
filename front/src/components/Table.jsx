import React from "react";
import "../styles/table.css";
import Button from "./Button";
import Input from "./Input";
import { Link } from "react-router-dom";
import User from "./User";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "aos/dist/aos.css";
import { AOS } from "aos";
import { useParams } from "react-router-dom";

const Table = () => {
  const [dataUser, setDataUser] = useState([]);

  const [search, setSearch] = useState("");

  const params = useParams()

  useEffect(() => {
    axios
      .get("/api/user/get-users")
      .then((res) => {
        // console.log(res.data, "desde la table");
        setDataUser(res.data);
        // AOS.init()
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Buscar por dni
  const Search = () => {
    axios.post("/api/user/get-user-dni", {dni: params.dni})
    .then(res => {
      // console.log(res.data, "usuario encontrado: ", search)
    })
  };
  // console.log(search);

  // Mapea los usuarios 
  const listUsers = dataUser.map((user) => {
    return (
      <>
        <User user={user}></User>
      </>
    );
  });

  return (
    <div className="container-table">
      <div className="table">
        <h3>Listado de usuarios activos</h3>
        <div className="table__container-buttons-input">
          <Link to="/create-user">
            <Button className="btn primary" name="Crear usuario"></Button>
          </Link>
          <div>
          <Input
            className="input-search"
            placeholder="Bucar por DNI"
            type="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></Input>
          <Button
            className="btn primary"
            name="Buscar"
            onClick={Search}
          ></Button>
          </div>
        </div>
        <hr />
        <table>
          <thead className="thead">
            <tr>
              <th className="table__th">D.N.I</th>
              <th className="table__th">NOMBRE</th>
              <th className="table__th">APELLIDO</th>
              <th className="table__th">SEXO</th>
              <th className="table__th">TELÉFONO</th>
              <th className="table__th acciones">ACCIONES</th>
            </tr>
            {/* <hr/> */}
          </thead>
          <tbody>{listUsers}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
