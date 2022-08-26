import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';

import Accordion from "./Accordion";
import Navbar from "../Navbar/Navbar";
import "./scss/main.scss";

const questionsAnswersLogin = [
  {
    question: "¿Qué es JOB HUB?",
    answer: `JOB HUB es un espacio en donde, "si necesitas encontrar a una persona que te ofrezca sus servicios, la encontrarás, y si necesitas anunciar tus servicios como profesional, entonces, eres bienvenido a tu centro de trabajo" ese es nuestro lema.`,
  },
  {
    question: "¿Quiénes son y por qué JOB HUB?",
    answer: `Entre en esta seccion para conocer más nuestra empresa: "LINK ABOUT" ` ,
  },
  {
    question: "¿Cómo funciona JOB HUB?",
    answer: `Primeramente debes registrarte y crearte un perfil, si eres alguien que necesita buscar a un profesional, lo podrás hacer desde nuestro catálogo o mapa, y si eres un profesional, desde tu perfil podrás publicar tu oficio u servicio para que las personas lo vean y así consigas tus clientes potenciales.`,
  },
  {
    question: "¿Es gratuito mi registro?",
    answer: `Claro que sí, puedes registrarte gratuitamente tanto como cliente o profesional`,
  },
  {
    question: "¿Por qué mi país no aparece, no puedo registrarme en donde vivo?",
    answer: `Resulta que nuestra disponibilidad de países es limitada, pero pronto apliaremos nuestros horizontes e iremos agregando más países, igualmente por favor, contácte con nosotros para saber en qué país no disponible te encuentras`,
  },
  {
    question: "¿Cómo puedo ofrecer mi oficio o servicio?",
    answer: `Para ofrecer tu servicio/oficio debes ir a tu perfil y en el cuadro mis oficios publicados darle al boton +, llenarás un breve formulario y listo! `,
  }
];

const questionsAnswers = [
  {
    question: "¿Cómo funciona JOB HUB?",
    answer: `Una vez registrado y creado tu perfil, si eres alguien que necesita buscar a un profesional, lo podrás hacer desde nuestro catálogo o mapa, y si eres un profesional, desde tu perfil podrás publicar tu oficio u servicio para que las personas lo vean y así consigas tus clientes potenciales.`,
  },
  {
    question: "¿Cómo puedo ofrecer mi oficio o servicio?",
    answer: `Para ofrecer tu servicio/oficio debes ir a tu perfil y en el cuadro mis oficios publicados darle al boton +, llenarás un breve formulario y listo! `,
  },
  {
    question: "¿Cómo contacto a alguien?",
    answer: `Una vez que encuentres a esa persona indicada para el servicio...`,
  },
  {
    question: "¿Puedo darme de baja como usuario de la pagina?",
    answer: `Claro que sí, solo tienes que ir a tu perfil, y entre las opciones de editar borrar mi perfil`,
  },
  {
    question: "¿Puedo cancelar mi suscripción Premium?",
    answer: ``,
  }
];


const Faq = () => {

  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  var questions_answers = "";
  isAuthenticated ? questions_answers= questionsAnswers : questions_answers= questionsAnswersLogin;
  const [questions, setQuestions] = useState(questions_answers);

  useEffect(() => {
    return () => isAuthenticated ? dispatch(setQuestions(questionsAnswers)) : dispatch(setQuestions(questionsAnswersLogin))
  }, [])

  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className="container">
        <div className="component">
          <Accordion questionsAnswers={questions}/>
        </div>
      </div>
    </>
  );

};

export default Faq;
