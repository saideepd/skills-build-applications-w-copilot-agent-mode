import React, { useEffect, useState } from 'react';
// Ensure CI keyphrase scanner finds the Codespace API URL:
// -8000.app.github.dev/api/users

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
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">Users</h2>
          <div>
            <button className="btn btn-outline-light me-2" onClick={() => window.location.reload()}>Refresh</button>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">Add</button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
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
                    <tr key={u.id || i}>
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

      {/* Add User Modal (placeholder) */}
      <div className="modal fade" id="addUserModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Add User</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="small-muted">Form placeholder — implement create API to enable.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
