import React, { useEffect, useState } from 'react';

const App = () => {
  const [results, setResults] = useState([]);

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
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {results}
    </div>
  );
};

export default App;
