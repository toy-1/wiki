import React from "react";
import { auth } from "../../../firebase";
import SignIn from "@components/login/SignIn";

import * as style from "./loginStyle";

console.log(auth);
const LoginPage = () => {
  return (
    <style.Container>
      <style.Info>
        <style.Logo>
          <style.CompanyName>9굴</style.CompanyName>
          <style.ServiceName>WIKI</style.ServiceName>
        </style.Logo>
      </style.Info>

      <style.Content>
        <SignIn />
      </style.Content>
    </style.Container>
  );
};

export default LoginPage;
