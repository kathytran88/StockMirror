import './App.css';
import { useRef } from 'react';
import { useState } from "react";

function App() {
  const nameRef = useRef(null);

  // state: traderData - json format data of the currently selected trader
  const [ traderData, setTraderData ] = useState(null);
  // state: traderName - name of current trader to display on output section
  const [ traderName, setTraderName ] = useState(null);

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1> Stock Mirror </h1>
        <p> Trade with confidence, trust, and guidance </p>
        <div></div>
      </div>

      {/* Main */}
      <div className="main">
        <div className="bg-shade">
          {/* View Activity */}
          <form onSubmit={async (event) => {
            event.preventDefault();

            // get name
            const name = nameRef.current.value;

            // send ajax to server
            try {
              const response = await fetch(`/api/getByName/${name}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                },
              });
            
              if (response.ok) { // Check if response status is 200
                const data = await response.json(); // Safely parse JSON
                setTraderName(name); // Update state
                setTraderData(data); // Update state
                console.log("Data fetched:", data); // Debugging output
              } else {
                console.error("Failed to fetch data:", response.status);
                setTraderData(null); // Handle error in data fetching
              }
            } catch (error) {
              console.error('Error fetching data:', error);
              setTraderData(null); // Handle error in data fetching
            }
          }}>
            {/* Name */}
            <div className="form-name">
              <label htmlFor="name"> Name: </label>
              <input type="text" id="name" name="name" ref={nameRef} required />
            </div>

            {/* View Activity */}
            <div className="form-button">
              <button type="submit"> View Activity </button>
            </div> 
          </form>
        </div>
      </div>

      {/* Output */}
      <div className="output">
        <h1 className="output-title"> Results For: {traderName} </h1>

        <div className="table-window">
          {/* Table */}
          {traderData === null ? <p> No Trader Selected </p> : 
          <table className="table">
            <thead>
              <tr>
                <th>Stock Name</th>
                <th>Portfolio Weight</th>
                <th>Action</th>
                <th>Shares Held</th>
                <th>Current Price</th>
                <th>Market Value</th>
                <th>Average Cost</th>
                <th>% Of Portfolio</th>
                <th>Low Price</th>
                <th>High Price</th>
              </tr>
            </thead>
            <tbody>
              {traderData.map((traderEntry, traderIndex) => {
                return (
                  <tr key={traderIndex}>
                    <td>{traderEntry[0]}</td>
                    <td>{traderEntry[1]}</td>
                    <td>{traderEntry[2]}</td>
                    <td>{traderEntry[3]}</td>
                    <td>{traderEntry[4]}</td>
                    <td>{traderEntry[5]}</td>
                    <td>{traderEntry[7]}</td>
                    <td>{traderEntry[8]}</td>
                    <td>{traderEntry[9]}</td>
                    <td>{traderEntry[10]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </div>
  );
}

export default App;
