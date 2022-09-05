/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

import Accordion from "./Accordion";
import Navbar from "../Navbar/Navbar";
import "./scss/main.scss";

const Faq = () => {

  const { isAuthenticated } = useAuth0();

  return (
    <>
    <Navbar />
      <div className="container">
        <div className="component">
          <Accordion />
        </div>
      </div>
    </>
  );
};

export default Faq;
