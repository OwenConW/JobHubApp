import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import AccordionItem from "./AccordionItem";

const questionsAnswersLogin = [
  {
    question: "¿Qué es JOB HUB?",
    answer: `JOB HUB es un espacio en donde, "si necesitas encontrar a una persona que te ofrezca sus servicios, la encontrarás, y si necesitas anunciar tus servicios como profesional, entonces, eres bienvenido a tu centro de trabajo" ese es nuestro lema.`,
  },
  {
    question: "¿Quiénes son y por qué JOB HUB?",
    answer: `Entre en esta seccion para conocer más nuestra empresa: LINK ABOUT` ,
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
    answer: `Para ofrecer tu oficio o servicio debes ir a tu perfil, y debes agregar tu nuevo oficio desde el botón +, ahí llenarás un formulario y listo!`,
  }
];

const questionsAnswers = [
  {
    question: "¿Cómo funciona JOB HUB?",
    answer: `Primeramente debes registrarte y crearte un perfil, si eres alguien que necesita buscar a un profesional, lo podrás hacer desde nuestro catálogo o mapa, y si eres un profesional, desde tu perfil podrás publicar tu oficio u servicio para que las personas lo vean y así consigas tus clientes potenciales.`,
  },
  {
    question: "¿Cómo puedo ofrecer mi oficio o servicio?",
    answer: `Para ofrecer tu oficio o servicio debes ir a tu perfil, y debes agregar tu nuevo oficio desde el botón +, ahí llenarás un formulario y listo!`,
  },
  {
    question: "¿Puedo darme de baja como usuario de la pagina?",
    answer: `Claro que sí, solo tienes que ir a tu perfil, editar y entre las opciones seleccionar borrar mi perfil`,
  },
  {
    question: "¿Puedo cancelar mi suscripción Premium?",
    answer: `Una vez que se hace un pago, no es posible la devolución por la configuración de los sistemas, pero si es posible cancelarla para que la próxima vez no se cobre ya que funciona como una suscripción.`,
  },
];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { isAuthenticated } = useAuth0();
  var actual_questions = "";
  isAuthenticated ? actual_questions= questionsAnswers : actual_questions= questionsAnswersLogin

  const renderedQuestionsAnswers = actual_questions.map((item, index) => {
    const showDescription = index === activeIndex ? "show-description" : "";
    const fontWeightBold = index === activeIndex ? "font-weight-bold" : "";
    const ariaExpanded = index === activeIndex ? "true" : "false";
    return (
      <AccordionItem
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        item={item}
        index={index}
        onClick={() => {
          index === activeIndex ? setActiveIndex(-1) : setActiveIndex(index)
        }}
      />
    );
  });

  return (
    <>
      <div className="faq">
        <h2 className="title">FAQ</h2>
        <dl className="faq__list">{renderedQuestionsAnswers}</dl>
      </div>
    </> 
  );
};

export default Accordion;
