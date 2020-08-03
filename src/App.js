import React, { useEffect, useState } from 'react';
import { districts, divisions } from './util';
console.log(districts);
const App = () => {
  const [results, setResults] = useState([]);
  const [selectedDistrict, setDistrict] = useState(0);
  const [selectedDivision, setDivision] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {

      fetch("/results")
      .then(res => res.json())
      .then(
        (result) => {
          setResults(result);
        },
        (error) => {
          console.log(error);
        }
      )
      setResults([]);
    }, 60000);
    return () => clearInterval(id);
  }, []);

  function setDistrictVal(e) {
    setDistrict(e.currentTarget.value);
    setDivision(0);
  }

  function setDivisionVal(e) {
    setDivision(e.currentTarget.value);
  }

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">General Election 2020</h2>
        <div className="selection">
          <select name="district" id="district" className="district" onChange={setDistrictVal}>
            {districts && districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>

          {selectedDistrict>0 ? (<select name="division" id="division" className="division" onChange={setDivisionVal}>
            <option defaultValue value="0"> district </option>
            {selectedDistrict && divisions[selectedDistrict].map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>) : ''}
        </div>
      </div>
      <Result
        selectedDistrict={selectedDistrict}
        selectedDivision={selectedDivision}
      />
    </div>
  );
};

export default App;
