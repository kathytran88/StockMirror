import './App.css';
import { useRef } from 'react';

function App() {
  const nameRef = useRef(null);

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

            // send ajax to server
            try {
              const response = await fetch(`/api/getByName/Warren Buffet`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                },
              });
              const data = await response.json();
              console.log(data); // TEST
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }}>
            {/* Name */}
            <div className="form-name">
              <label htmlFor="name"> Name: </label>
              <input type="text" id="name" name="name" required />
            </div>

            {/* View Activity */}
            <button type="submit"> View Activity </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
