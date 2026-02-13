import React, { useEffect, useState } from 'react';

function getBaseUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) return `https://${codespace}-8000.app.github.dev/api/`;
  return '/api/';
}

export default function Workouts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `${getBaseUrl()}workouts/`;
    console.log('Fetching Workouts from', url);
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        console.log('Workouts fetched:', json);
        const result = json.results ? json.results : json;
        setData(result);
      })
      .catch((err) => console.error('Workouts fetch error:', err));
  }, []);

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">Workouts</h2>
          <div>
            <button className="btn btn-outline-light me-2" onClick={() => window.location.reload()}>Refresh</button>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addWorkoutModal">Add</button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Workout</th>
                  <th>Reps</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length ? (
                  data.map((w, i) => (
                    <tr key={w.id || i}>
                      <td>{i + 1}</td>
                      <td>{w.user}</td>
                      <td>{w.workout}</td>
                      <td>{w.reps}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4">No workouts</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Workout Modal (placeholder) */}
      <div className="modal fade" id="addWorkoutModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Add Workout</h5>
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
