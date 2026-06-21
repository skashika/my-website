import React from 'react';
import { stats } from '../data/profile';

export default function StatsSection() {
  return (
    <div className="stats-band">
      <div className="container">
        <div className="stats-grid">
          {stats.map(stat => (
            <div key={stat.label} className="stat-cell">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
