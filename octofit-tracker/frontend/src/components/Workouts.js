import React, { useEffect, useState } from 'react';

function getBaseUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) return `https://${codespace}-8000.app.github.dev/api/`;
  return '/api/';
}

export default function Workouts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `${getBaseUrl()}workouts/`;
    console.log('Fetching Workouts from', url);
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        console.log('Workouts fetched:', json);
        const result = json.results ? json.results : json;
        setData(result);
      })
      .catch((err) => console.error('Workouts fetch error:', err));
  }, []);

  return (
    <div className="container mt-3">
      <h3>Workouts</h3>
      <ul className="list-group">
        {data && data.length ? (
          data.map((w, i) => (
            <li className="list-group-item" key={i}>{w.user}: {w.workout} ({w.reps})</li>
          ))
        ) : (
          <li className="list-group-item">No workouts</li>
        )}
      </ul>
    </div>
  );
}
