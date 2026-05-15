import { createContext, useContext, useState } from "react";

export const TesauroContext = createContext();

export const useTesauro = () => useContext(TesauroContext);

export const TesauroProvider = ({ children }) => {
  const [letter, setLetter] = useState(false);
  const [terms, setTerms] = useState([]);
  const [term, setTerm] = useState(false);
  const [text, setText] = useState("");
  const [conceptSelected, setConceptSelected] = useState(false);

  const updateLetter = (letter) => {
    setLetter(letter);
    setConceptSelected(false)
  };
  const updateConceptSelected = (option) => {
    setConceptSelected(option);
  };
  const updateTerms = (terms) => {
    setTerms(terms);
  };
  const updateTerm = (term) => {
    setTerm(term);
  };
  const updateText = (text) => {
    setText(text);
    setLetter(false);
  };

  return (
    <TesauroContext.Provider
      value={{
        terms,
        letter,
        conceptSelected,
        updateLetter,
        updateConceptSelected,
        updateTerms,
        updateTerm,
        term,
        text,
        updateText,
      }}
    >
      {children}
    </TesauroContext.Provider>
  );
};
