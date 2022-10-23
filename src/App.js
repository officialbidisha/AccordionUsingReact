import "./App.css";
import Accordion from "./components/Accordion";
import data from "./data";

function App() {
  console.log(data);
  return (
    <div className="App">
      <Accordion>
        <Accordion.Title>Frquent Accordions</Accordion.Title>
        <Accordion.Frame>
          {data.map((datum) => {
            return (
              <Accordion.Item key={datum.id}>
                <Accordion.Header onToggle={(state)=> {console.log(state)}}>{datum.header}</Accordion.Header>
                <Accordion.Body>{datum.body}</Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion.Frame>
      </Accordion>
    </div>
  );
}

export default App;
