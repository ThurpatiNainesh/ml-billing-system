import React, { useState } from 'react';
import api from '../services/api';

export default function ProjectForm({ onAdded }) {
  const [proj, setProj] = useState({
    poNumber: '', name: '', type: 'Mockups', category: 'Simple',
    clientName: '', designation: '', dateDelivered: '', status: 'completed', cost: '', notes: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setProj(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post('/', proj);
    onAdded();
    setProj({ poNumber:'', name:'', type:'Mockups', category:'Simple', clientName:'', designation:'', dateDelivered:'', status:'completed', cost:'', notes:'' });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="poNumber" placeholder="PO Number" value={proj.poNumber} onChange={handleChange} required />
      <input name="name" placeholder="Project Name" value={proj.name} onChange={handleChange} required />
      <select name="type" value={proj.type} onChange={handleChange}>
        <option>Mockups</option><option>Proposals</option><option>Presentations</option><option>Credentials</option><option>RFP</option>
      </select>
      <select name="category" value={proj.category} onChange={handleChange}>
        <option>Simple</option><option>Medium</option><option>Complex</option>
      </select>
      <input name="clientName" placeholder="Client Name" value={proj.clientName} onChange={handleChange} required />
      <input name="designation" placeholder="Designation" value={proj.designation} onChange={handleChange} required />
      <input name="dateDelivered" type="date" value={proj.dateDelivered} onChange={handleChange} required />
      <select name="status" value={proj.status} onChange={handleChange}>
        <option value="ongoing">ongoing</option><option value="completed">completed</option><option value="pending">pending</option>
      </select>
      <input name="cost" type="number" placeholder="Cost" value={proj.cost} onChange={handleChange} />
      <textarea name="notes" placeholder="Notes" value={proj.notes} onChange={handleChange} />
      <button type="submit">Add Project</button>
    </form>
  );
}