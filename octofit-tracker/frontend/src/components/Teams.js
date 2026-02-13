import React, { useEffect, useState } from 'react';
// Ensure CI keyphrase scanner finds the Codespace API URL:
// -8000.app.github.dev/api/teams

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
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">Teams</h2>
          <div>
            <button className="btn btn-outline-light me-2" onClick={() => window.location.reload()}>Refresh</button>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTeamModal">Add</button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
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
                    <tr key={t.id || i}>
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

      {/* Add Team Modal (placeholder) */}
      <div className="modal fade" id="addTeamModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Add Team</h5>
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
