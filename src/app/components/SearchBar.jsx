// import { useState } from 'react';

export default function SearchBar({ query, setQuery, setSongs }) {
  const handleSearch = async () => {
    const clientId = 'b5e1d1ac';
    const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&search=${encodeURIComponent(query)}&include=musicinfo&audioformat=mp31`);
    const data = await res.json();
    setSongs(data.results);
  };

  return (
    <div style={{ display: 'flex', marginBottom: '1rem' }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for songs or artists"
        style={{ flex: 1, padding: '0.5rem' }}
      />
      <button onClick={handleSearch} style={{ padding: '0.5rem' }}>Search</button>
    </div>
  );
}