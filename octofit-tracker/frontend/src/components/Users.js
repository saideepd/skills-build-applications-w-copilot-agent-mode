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
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Users</h3>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length ? (
                  data.map((u, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.team}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4">No users</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
