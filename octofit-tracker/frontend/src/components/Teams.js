import React, { useEffect, useState } from 'react';

function getBaseUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) return `https://${codespace}-8000.app.github.dev/api/`;
  return '/api/';
}

export default function Teams() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `${getBaseUrl()}teams/`;
    console.log('Fetching Teams from', url);
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        console.log('Teams fetched:', json);
        const result = json.results ? json.results : json;
        setData(result);
      })
      .catch((err) => console.error('Teams fetch error:', err));
  }, []);

  return (
    <div className="container mt-3">
      <h3>Teams</h3>
      <ul className="list-group">
        {data && data.length ? (
          data.map((t, i) => (
            <li className="list-group-item" key={i}>{t.name}: {Array.isArray(t.members) ? t.members.join(', ') : String(t.members)}</li>
          ))
        ) : (
          <li className="list-group-item">No teams</li>
        )}
      </ul>
    </div>
  );
}
