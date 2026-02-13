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
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">Leaderboard</h2>
          <div>
            <button className="btn btn-outline-light me-2" onClick={() => window.location.reload()}>Refresh</button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length ? (
                  data.map((t, i) => (
                    <tr key={t.id || i}>
                      <td>{i + 1}</td>
                      <td>{t.team}</td>
                      <td>{t.points}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3">No leaderboard data</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
