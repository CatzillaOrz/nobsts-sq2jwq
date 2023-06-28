import React from 'react';
import './App.css';

const Heading = (props: { title: string }) => <h2>{props.title}</h2>;
const Box: React.FunctionComponent = (children) => (
  <div style={{
    padding: '1rem',
    fontWeight: 'bold',
  }}>
  </div>)
const List: React.FunctionComponent<{
  items: string[]
}> = ({ items }) => {
  <ul>
    {items.map((item, index) => (
      <li key={index}> {item}</li>
    ))}
  </ul>
}
function App() {
  return (
    <div className="App">
      <Heading title='ts-in-react' />
      <List items={["one", "tow"]} />
    </div>
  );
}

export default App;
