import React from 'react';
import AddPet from './AddPet';
import Dashboard from './Dashboard';

export default function AdminPage() {
  return (
    <div>
      <AddPet />
      <hr class='divider'></hr>
      <Dashboard />
    </div>
  );
}
