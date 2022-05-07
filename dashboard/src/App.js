import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://158.101.97.67:8080/data.json")
    // fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        ${items}

      </div>
      // <ul>
      //   {items.map(item => (
      //     <li key={item.id}>
      //       {item.name} {item.price}
      //     </li>
      //   ))}
      // </ul>
    );
  }
}

export default App;
