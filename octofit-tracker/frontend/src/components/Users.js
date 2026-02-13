import React, { useEffect, useState } from 'react';

function getBaseUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) return `https://${codespace}-8000.app.github.dev/api/`;
  return '/api/';
}

export default function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `${getBaseUrl()}users/`;
    console.log('Fetching Users from', url);
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        console.log('Users fetched:', json);
        const result = json.results ? json.results : json;
        setData(result);
      })
      .catch((err) => console.error('Users fetch error:', err));
  }, []);

  return (
    <div className="container mt-3">
      <h3>Users</h3>
      <ul className="list-group">
        {data && data.length ? (
          data.map((u, i) => (
            <li className="list-group-item" key={i}>{u.name} ({u.email}) - {u.team}</li>
          ))
        ) : (
          <li className="list-group-item">No users</li>
        )}
      </ul>
    </div>
  );
}
