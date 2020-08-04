import React, { useEffect, useState } from 'react';
import { districts, divisions } from './util';
import Result from './Result';

const App = () => {
  const [results, setResults] = useState([]);
  const [selectedDistrict, setDistrict] = useState(0);
  const [selectedDivision, setDivision] = useState(0);

  useEffect(() => {
    const id = setInterval(callApi, 60000);
    callApi();
    return () => clearInterval(id);
  }, []);

  function callApi() {/*
    fetch("https://general-election-2020.herokuapp.com/recent")
    .then(res => res.json())
    .then(
      (result) => {
        setResults(result);
      },
      (error) => {
        console.log(error);
      }
    )*/
    setResults([{"id":108,"name":"Homagama","districtId":1,"districtName":"Colombo","total":130740,"result":[{"id":"8","votes":"66450","perc":50.82606700321248,"seatPerc":null,"seats":0},{"id":"3","votes":"52336","perc":40.03059507419305,"seatPerc":null,"seats":0},{"id":"9","votes":"10719","perc":8.198715006883893,"seatPerc":null,"seats":0}]},{"id":113,"name":"Maharagama","districtId":1,"districtName":"Colombo","total":98548,"result":[{"id":"8","votes":"47049","perc":47.74221699070504,"seatPerc":null,"seats":0},{"id":"3","votes":"41374","perc":41.98360189958193,"seatPerc":null,"seats":0},{"id":"9","votes":"9001","perc":9.133620164792791,"seatPerc":null,"seats":0}]},{"id":110,"name":"Kesbewa","districtId":1,"districtName":"Colombo","total":127240,"result":[{"id":"8","votes":"65243","perc":51.27554228230116,"seatPerc":null,"seats":0},{"id":"3","votes":"49637","perc":39.01053127947186,"seatPerc":null,"seats":0},{"id":"9","votes":"11193","perc":8.796762024520591,"seatPerc":null,"seats":0}]},{"id":114,"name":"Moratuwa","districtId":1,"districtName":"Colombo","total":90041,"result":[{"id":"3","votes":"43665","perc":48.49457469375062,"seatPerc":null,"seats":0},{"id":"8","votes":"40142","perc":44.581912684221635,"seatPerc":null,"seats":0},{"id":"9","votes":"5384","perc":5.979498228584756,"seatPerc":null,"seats":0}]},{"id":116,"name":"Postal","districtId":1,"districtName":"Colombo","total":25827,"result":[{"id":"3","votes":"11446","perc":44.31796182289852,"seatPerc":null,"seats":0},{"id":"8","votes":"10867","perc":42.07612188794672,"seatPerc":null,"seats":0},{"id":"9","votes":"3087","perc":11.952607736090139,"seatPerc":null,"seats":0}]},{"id":1,"name":"Colombo","seats":19,"total":1208899,"eligibleTotal":1201250,"parties":{"3":{"id":"3","votes":616413,"perc":50.989619480204716,"seatPerc":51.31429760665973,"seats":10,"remain":1.3142976066597303},"8":{"id":"8","votes":503446,"perc":41.64500094714281,"seatPerc":41.91017689906347,"seats":8,"remain":3.021288010174585},"9":{"id":"9","votes":81391,"perc":6.732655085329709,"seatPerc":6.775525494276795,"seats":1,"remain":1.2199699387212393}},"result":[{"id":"3","votes":616413,"perc":50.989619480204716,"seatPerc":51.31429760665973,"seats":10,"remain":1.3142976066597303},{"id":"8","votes":503446,"perc":41.64500094714281,"seatPerc":41.91017689906347,"seats":8,"remain":3.021288010174585},{"id":"9","votes":81391,"perc":6.732655085329709,"seatPerc":6.775525494276795,"seats":1,"remain":1.2199699387212393}]}]);

  }

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
      <div className="results">
        {results.map((result) => (
          <Result key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

export default App;
