import React from 'react';

export default function AuthCard({ icon: Icon, heading, children, onSubmit }) {
  return (
    <main className="container card-container">
      <form className="card" onSubmit={onSubmit}>
        {Icon && <Icon className="card-icon" />}
        {heading && <h2 className="heading-1">{heading}</h2>}
        {children}
      </form>
    </main>
  );
}
