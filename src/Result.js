import React from 'react';

function Result(props) {
  const { result } = props;

  return <div className="result-container">
    <div className="division-header">
      {result.id < 100 ? result.name : `${result.districtName} - ${result.name}`}
    </div>
    <div className="division-content">
      {
        result.result.map(r =>
          <div className="party">
            <div className="party-logo">{r.id}</div>
            <div className="party-votes">{r.votes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <div className="party-perc">{Number(r.perc).toFixed(2)}%</div>
            {result.id < 100 ? <div className="party-seats">{r.seats}</div> : ''}
          </div>
        )
      }
    </div>
  </div>;
}

export default Result;
