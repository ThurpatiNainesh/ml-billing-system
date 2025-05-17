import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';

export default function App() {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="container">
      <h1>ML Billing System</h1>
      <Routes>
        <Route path="/" element={<><ProjectForm onAdded={() => setRefresh(r => !r)} /><ProjectList key={refresh} /></>} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
}