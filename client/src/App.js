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
              const data = await response.json();

              // set states as necessary for output display
              setTraderName(name);
              setTraderData(data);
            } catch (error) {
              console.error('Error fetching data:', error);
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
          <table className="table"></table>}
        </div>
      </div>
    </div>
  );
}

export default App;
