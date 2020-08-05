import React, { useEffect, useState } from 'react';
import useSetInterval from "@reacthooks.org/use-set-interval";
import { districts, divisions } from './util';
import Result from './Result';

const App = () => {
  const [results, setResults] = useState([]);
  const [selectedDistrict, setDistrict] = useState(0);
  const [selectedDivision, setDivision] = useState(0);
  const [recent, setRecent] = useState(false);

  useSetInterval(callApi, 60000);

  useEffect(() => {
    callApi();
  }, [selectedDivision, recent]);

  function callApi() {
    console.log("isRecent "+recent);
    fetch(recent ? "/recent" : ("/results/"+selectedDivision))
    .then(res => res.json())
    .then(
      (result) => {
        setResults(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  function setDistrictVal(e) {
    setDistrict(e.currentTarget.value);
    setDivision(e.currentTarget.value);
  }

  function setDivisionVal(e) {
    setDivision(e.currentTarget.value);
  }

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">General Election 2020 {recent ? 'R':'N'}</h2>
        <div className="result-type">
          <button className={recent ? '' : 'active'} onClick={() => setRecent(false)}>Overview</button>
          <button className={recent ? 'active' : ''} onClick={() => setRecent(true)}>Recent</button>
        </div>
        {recent ? '' : <div className="selection">
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
        </div>}
      </div>
      <div className="results">
        {results.map((result) => (
          <Result key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

export default App;
