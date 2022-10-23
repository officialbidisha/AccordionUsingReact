import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
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
  const toggle = useCallback(()=> setToggleShow((prevState)=> !prevState), []);
  let val = useMemo(()=> ({toggleShow, toggle}), [toggle, toggleShow])
  return (
    <AccordionContext.Provider value={val}>
      <div className="accordion-item" {...restProps}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({
  onToggle,
  children,
  ...restProps
}) {
  const { toggleShow, toggle } = useContext(AccordionContext);
  /**
   * Check for mounting
   */
  const componentJustMounted = useRef(true);

  /**
   * Function to call when the expanded state is altered tp true,
   * that is when the expansion happens.
   */
  useEffect(() => {
    if (!componentJustMounted.current) {
      onToggle(toggleShow);
    }
    componentJustMounted.current = false;
  }, [toggleShow, onToggle]);

  return (
    <div 
    className="header" 
    {...restProps} 
    onClick={toggle}
    >
      {children}
    </div>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  
  const { toggleShow } = useContext(AccordionContext);
  return !toggleShow && 
      <div 
      className="accordion-body" 
      {...restProps}
      >
        {children}
      </div>
  ;
};

export default Accordion;
