import { createContext, useContext, useState } from "react";
import "./Accordion.css";
const AccordionContext = createContext();
const Accordion = ({ children, ...restProps }) => {
  return (
    <div className="container" {...restProps}>
      <div className="inner">{children}</div>
    </div>
  );
};

Accordion.Title = ({ children, ...restProps }) => {
  return (
    <div className="title" {...restProps}>
      {children}
    </div>
  );
};

Accordion.Frame = function AccordionFrame({ children, ...restProps })  {
  return (
    <div className="frame" {...restProps}>
      {children}
    </div>
  );
};

Accordion.Item = function AccordionItem ({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = useState(true);
  return (
    <AccordionContext.Provider value={{ toggleShow, setToggleShow }}>
      <div className="accordion-item" {...restProps}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({ children, ...restProps })  {
  const { toggleShow, setToggleShow } = useContext(AccordionContext);
  return (
    <div
      className="header"
      {...restProps}
      onClick={() => setToggleShow(!toggleShow)}
    >
      {children}
    </div>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
    const { toggleShow } = useContext(AccordionContext);
    return (
      <div
        className={`accordion-body ${toggleShow? 'open': 'closed'}`}
        {...restProps}
      >
        {children}
      </div>
    );
  };

export default Accordion;
