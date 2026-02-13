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
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Teams</h3>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length ? (
                  data.map((t, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{t.name}</td>
                      <td>{Array.isArray(t.members) ? t.members.join(', ') : String(t.members)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3">No teams</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
