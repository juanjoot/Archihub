import React, { useState, useEffect } from "react";
import { Button, Form, Card, Modal } from "react-bootstrap";
import { compromise, acceptCompromise } from "../../crud/auth.crud";
import { useNavigate } from "react-router-dom";

function UserCompromise(props) {
  let history = useNavigate();

  const [show, setShow] = useState(false);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await compromise();
      if (response && !response.compromise) setShow(true);
    }
    fetchMyAPI();
  }, []);

  const handleAccept = () => {
    setShow(false);
    acceptCompromise();
  };
  const handleNoAccept = () => {
    history.push("/logout");
    setShow(false);
  };
  return (
    <>
      <Modal
        style={{ zIndex: "1101" }}
        show={show}
        onHide={handleNoAccept}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>COMPROMISO DE RESERVA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          La información consultada es información reservada, en los términos de
          la Ley 1621 de 2013<sup>[1]</sup> Ley de Inteligencia, Ley 1712 de
          2014<sup>[2]</sup>, Ley 1581 de 2012<sup>[3]</sup>, 1448 de 2011
          <sup>[4]</sup>, Ley 599 de 2000<sup>[5]</sup>, Ley 600 de 2000
          <sup>[6]</sup>, Ley 1922 de 2018<sup>[7]</sup>, Ley Estatutaria 1957
          de 2019<sup>[8]</sup> y demás normas aplicables. El acceso indebido a
          ella pone en riesgo derechos a la intimidad, vida y seguridad,
          derechos de infancia y adolescencia, derechos de las víctimas, entre
          otros, y a intereses públicos de defensa y seguridad nacional,
          seguridad pública, investigación y persecución de delitos, debido
          proceso, reserva judicial, administración de justicia, investigación y
          esclarecimiento de graves violaciones a los derechos humanos,
          reconstrucción de la verdad acerca de lo ocurrido durante el conflicto
          armado, entre otros.
          <br></br>
          <br></br>
          Por lo tanto, la persona que incumpla el presente COMPROMISO DE
          RESERVA y sin autorización brinde acceso, revele, comparta, filtre,
          divulgue, dé a conocer, envíe, entregue, filtre, ofrezca, intercambie,
          comercialice, emplee o permita que alguien emplee esta información,
          podrá ser sancionada con la terminación de su vínculo contractual con
          la Comisión de la Verdad, y las demás sanciones disciplinarias,
          fiscales y penales que corresponden.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAccept}>
            Acepto
          </Button>
          <Button variant="secondary" onClick={handleNoAccept}>
            No acepto
          </Button>
        </Modal.Footer>
      </Modal>{" "}
    </>
  );
}
export default UserCompromise;
