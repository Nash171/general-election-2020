import React from 'react';
import { parties } from './util';

function Result(props) {
  const { result } = props;

  return <div className="result-container">
    <div className="division-header">
      {result.id < 100 ? result.name : `${result.districtName} - ${result.name}`}
    </div>
    <div className="division-content">
      {
        result.result.map(r =>
          <div className="party" key={r.id}>
            <div className="party-logo"><img className="party-logo-img" src={`../images/party-${+r.id<8 ? r.id : 0 }.png`} alt="Logo" /></div>
            <div className="party-result">
              <div className="party-nav">
                <div className="party-name">{parties[r.id].name}</div>
                <div className="party-votes">{r.votes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              </div>
              {(result.id>0 && result.id<100) ? (<div className="seat-alloc">
                <div className="seat-perc" style={{width: r.seatPerc+"%", backgroundColor: parties[r.id].color}}></div>
                {Array(result.seats-1).fill(null).map((r,i)=><div key={i} className="seat-block"></div>)}
              </div>) : ''}
            </div>
            <div className="party-perc">{Number(r.perc).toFixed(2)}%</div>
            {result.id < 100 ? <div className="party-seats">{r.id ? r.seats : (r.seats+r.disSeats)}</div> : ''}
          </div>
        )
      }
    </div>
  </div>;
}

export default Result;
