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
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Activities</h3>
          <button className="btn btn-primary mb-3" onClick={() => window.location.reload()}>Refresh</button>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Activity</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length ? (
                  data.map((a, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{a.user || a.name}</td>
                      <td>{a.activity || JSON.stringify(a)}</td>
                      <td>{a.duration || ''}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4">No activities</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
