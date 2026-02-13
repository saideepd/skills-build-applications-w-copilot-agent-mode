import React, { useEffect, useState } from 'react';

function getBaseUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) return `https://${codespace}-8000.app.github.dev/api/`;
  return '/api/';
}

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `${getBaseUrl()}leaderboard/`;
    console.log('Fetching Leaderboard from', url);
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        console.log('Leaderboard fetched:', json);
        const result = json.results ? json.results : json;
        setData(result);
      })
      .catch((err) => console.error('Leaderboard fetch error:', err));
  }, []);

  return (
    <div className="container mt-3">
      <h3>Leaderboard</h3>
      <ul className="list-group">
        {data && data.length ? (
          data.map((t, i) => (
            <li className="list-group-item" key={i}>{t.team}: {t.points}</li>
          ))
        ) : (
          <li className="list-group-item">No leaderboard data</li>
        )}
      </ul>
    </div>
  );
}
