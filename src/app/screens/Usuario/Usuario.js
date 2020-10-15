import React from "react";
import RegisterForm from "./RegisterForm";
import DatosUsuario from "./DatosUsuario";

export default function UsuarioScreen() {
    const estaLogeado = false; // como hago para consultar el store??

    return estaLogeado ? <DatosUsuario /> : <RegisterForm />
}