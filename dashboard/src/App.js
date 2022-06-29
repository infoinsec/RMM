import logo from './logo.svg'
import './App.css'
import React, { useState, useEffect } from 'react'
import { useInterval } from './utils.mjs'
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';

function App() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [hosts, setHosts] = useState([])

  function getData() {
    fetch("http://158.101.97.67:3000/data.json")
    // fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(JSON.parse(result))
          setHosts(() => {
            let newHosts = Object.keys(JSON.parse(result))
            newHosts = newHosts.sort()
            oldHosts = hosts.sort()
            if (oldHosts.length !== newHosts.length) {
              return newHosts
            }
            return oldHosts            
          })

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }

  // getData()
  // useInterval(() => {
  //   getData()
  // }, 1000)

  var Chart = props => {
    return <div>Chart</div>
  }


  const Legend = React.memo(({hosts}) => {
    // let hosts = Object.keys(items)
    console.log(hosts)
    hosts = hosts.sort().map(host => {return (<div key={host}>
        <input type="checkbox" id={host} name={host} value={host} />
        <label htmlFor={host}>{host}</label>
      </div>)})
    return <form>
      {hosts}
    </form>
  })

  useEffect(() => {
    getData()
    const interval = setInterval(() => {
      console.log('This will run every second!')
      getData() 
    }, 1000)
    return () => clearInterval(interval)
  }, [])
    
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="App">
        {JSON.stringify(Object.keys(items))}
        <br />
        <Chart />
        <Legend hosts={hosts}/>

      </div>
      // <ul>
      //   {items.map(item => (
      //     <li key={item.id}>
      //       {item.name} {item.price}
      //     </li>
      //   ))}
      // </ul>
    )
  }
}

export default App
