import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(() => { api.get(`/${id}`).then(r => setP(r.data)); }, [id]);
  if (!p) return <p>Loading...</p>;
  return (
    <div className="detail">
      <h2>{p.name}</h2>
      <p><strong>PO:</strong> {p.poNumber}</p>
      <p><strong>Type:</strong> {p.type}</p>
      <p><strong>Category:</strong> {p.category}</p>
      <p><strong>Client:</strong> {p.clientName} ({p.designation})</p>
      <p><strong>Delivered:</strong> {new Date(p.dateDelivered).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {p.status}</p>
      {p.cost && <p><strong>Cost:</strong> ₹{p.cost}</p>}
      {p.notes && <p><strong>Notes:</strong> {p.notes}</p>}
    </div>
  );
}