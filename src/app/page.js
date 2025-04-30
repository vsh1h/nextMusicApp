// File: app/page.js
'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import SongResults from './components/SongResults';
import themes from './data/themes';

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(themes[0].background);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: selectedTheme }}>
      <Sidebar setSelectedTheme={setSelectedTheme} />
      <div style={{ flex: 1, padding: '1rem' }}>
        <SearchBar query={query} setQuery={setQuery} setSongs={setSongs} />
        <SongResults songs={songs} />
      </div>
    </div>
  );
}
