import React from "react";
import t from "tcomb-form-native";

import formValidation from "../utils/Validation";
import inputTemplate from "./templates/Input";

export const RegisterStruct = t.struct({
  name: t.String,
  email: formValidation.email,
  password: formValidation.password,
  passwordConfirmation: formValidation.password
});

export const RegisterOptions = {
  fields: {
    name: {
      template: inputTemplate,
      config: {
        placeholder: "Escribe tu nombre y apellido",
        iconName: "account-outline",
        iconType: "material-community",
        error: "Nombre inválido"
      }
    },
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
    },
    passwordConfirmation: {
      template: inputTemplate,
      config: {
        placeholder: "Repite tu contraseña",
        iconName: "lock-reset",
        iconType: "material-community",
        error: "Las contraseñas no coinciden",
        password: true,
        secureTextEntry: true
      }
    }
  }
};
