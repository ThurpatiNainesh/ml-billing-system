import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proj, setProj] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch project and populate form
    api.get(`/${id}`).then(r => {
      setProj(r.data);
      setForm({
        poNumber: r.data.poNumber,
        name: r.data.name,
        type: r.data.type,
        category: r.data.category,
        clientName: r.data.clientName,
        designation: r.data.designation,
        dateDelivered: r.data.dateDelivered.split('T')[0],
        status: r.data.status,
        cost: r.data.cost || '',
        notes: r.data.notes || ''
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.put(`/${id}`, form);
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (!proj) return <p>Project not found.</p>;

  return (
    <form onSubmit={handleSubmit} className="form mx-auto max-w-md">
      <h2 className="text-xl font-bold mb-4">Edit Project</h2>
      <input name="poNumber" placeholder="PO Number" value={form.poNumber} onChange={handleChange} required />
      <input name="name" placeholder="Project Name" value={form.name} onChange={handleChange} required />
      <select name="type" value={form.type} onChange={handleChange}>
        <option>Mockups</option><option>Proposals</option><option>Presentations</option><option>Credentials</option><option>RFP</option>
      </select>
      <select name="category" value={form.category} onChange={handleChange}>
        <option>Simple</option><option>Medium</option><option>Complex</option>
      </select>
      <input name="clientName" placeholder="Client Name" value={form.clientName} onChange={handleChange} required />
      <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} required />
      <input name="dateDelivered" type="date" value={form.dateDelivered} onChange={handleChange} required />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="ongoing">ongoing</option><option value="completed">completed</option><option value="pending">pending</option>
      </select>
      <input name="cost" type="number" placeholder="Cost" value={form.cost} onChange={handleChange} />
      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
      <div className="flex space-x-2 mt-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        <button type="button" onClick={() => navigate('/')} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
      </div>
    </form>
  );
}