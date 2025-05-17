import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ProjectList() {
  const [list, setList] = useState([]);
  useEffect(() => { api.get('/').then(r => setList(r.data)); }, []);
  return (
    <ul className="list">
      {/* <h1>Hello!</h1> */}
      {list?.map(p => (
        <li key={p._id}>
          <Link to={`/projects/${p._id}`}>{p.poNumber} – {p.name}</Link>
        </li>
      ))}
    </ul>
  );
}