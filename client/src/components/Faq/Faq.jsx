import React from "react";
import Accordion from "./Accordion";

import "./scss/main.scss";


const questionsAnswers = [
  {
    question: "¿Qué es JOB HUB?",
    answer: ``,
  },
  {
    question: "¿Quiénes son y por qué JOB HUB?",
    answer:
      "Entre en esta seccion: " ,
  },
  {
    question: "¿Cómo funciona JOB HUB?",
    answer: ``,
  },
  {
    question: "¿Es gratuito mi registro?",
    answer: ``,
  },
  {
    question: "¿Cómo puedo ofrecer mi trabajo o profesión?",
    answer: ``,
  },
  {
    question: "¿Puedo darme de baja como usuario de la pagina?",
    answer: ``,
  },
  {
    question: "¿Puedo cancelar mi suscripción Premium?",
    answer: ``,
  },
];

const Faq = () => {
  return (
    <div className="container">
      <div className="component">
        <Accordion questionsAnswers={questionsAnswers} />
      </div>
    </div>
  );
};

export default Faq;
