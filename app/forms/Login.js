import React from "react";
import t from "tcomb-form-native";

import formValidation from "../utils/Validation";
import inputTemplate from "./templates/Input";

export const LoginStruct = t.struct({
  email: formValidation.email,
  password: formValidation.password
});

export const LoginOptions = {
  fields: {
    email: {
      template: inputTemplate,
      config: {
        placeholder: "Escribe tu correo electrónico",
        iconName: "at",
        iconType: "material-community",
        error: "Correo electrónico inválido"
      }
    },
    password: {
      template: inputTemplate,
      config: {
        placeholder: "Escribe tu contraseña",
        iconName: "lock-outline",
        iconType: "material-community",
        error: "Contraseña inválida",
        password: true,
        secureTextEntry: true
      }
    }
  }
};
