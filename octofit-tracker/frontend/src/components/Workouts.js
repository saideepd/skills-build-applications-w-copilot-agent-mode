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
        <div className="card-body">
          <h3 className="card-title">Workouts</h3>
          <div className="table-responsive">
            <table className="table table-striped">
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
                    <tr key={i}>
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
    </div>
  );
}
