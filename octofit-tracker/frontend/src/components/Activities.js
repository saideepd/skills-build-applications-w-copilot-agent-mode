import React, { useEffect, useState } from 'react';

function getBaseUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) return `https://${codespace}-8000.app.github.dev/api/`;
  return '/api/';
}

export default function Activities() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `${getBaseUrl()}activities/`;
    console.log('Fetching Activities from', url);
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        console.log('Activities fetched:', json);
        const result = json.results ? json.results : json;
        setData(result);
      })
      .catch((err) => console.error('Activities fetch error:', err));
  }, []);

  return (
    <div className="container mt-3">
      <h3>Activities</h3>
      <ul className="list-group">
        {data && data.length ? (
          data.map((a, i) => (
            <li className="list-group-item" key={i}>{a.user || a.name}: {a.activity || JSON.stringify(a)}</li>
          ))
        ) : (
          <li className="list-group-item">No activities</li>
        )}
      </ul>
    </div>
  );
}
