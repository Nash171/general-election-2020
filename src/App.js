import React, { useEffect, useState } from 'react';
import useSetInterval from "@reacthooks.org/use-set-interval";
import ReactGA from 'react-ga';
import { districts, divisions } from './util';
import Result from './Result';

ReactGA.initialize('UA-152722206-3');
ReactGA.pageview("general-election-2020");

const App = () => {
  const [results, setResults] = useState([]);
  const [selectedDistrict, setDistrict] = useState(0);
  const [selectedDivision, setDivision] = useState(0);
  const [recent, setRecent] = useState(true);

  useSetInterval(callApi, 60000);

  useEffect(() => {
    callApi();
  }, [selectedDivision, recent]);

  function callApi() {
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
        <h2 className="title">General Election 2020</h2>
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
        {results.length ? results.map((result) => (
          <Result key={result.id} result={result} />
        )) : <div className="not-released">result not released yet</div>}
      </div>
    </div>
  );
};

export default App;
