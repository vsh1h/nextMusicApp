'use client';

import { useState, useEffect, useRef } from 'react';

export default function PomodoroPage() {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.error(err));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      alert("Time's up!");
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleSearch = async () => {
    const clientId = 'b5e1d1ac';
    const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&search=${encodeURIComponent(query)}&include=musicinfo&audioformat=mp32`);
    const data = await res.json();
    setSongs(data.results);
  };

  const handleSongClick = (song) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const newAudio = new Audio(song.audio);
    newAudio.preload = 'auto';
    newAudio.play().catch((err) => console.error(err));
    audioRef.current = newAudio;
    setCurrentSong(song);
    setIsMusicPlaying(true);
  };

  return (
    <div style={{ padding: '2rem', background: '#1e1e1e', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>🎯 Pomodoro Timer</h1>

      {/* Timer Section */}
      <div style={{
        background: '#2d2d2d',
        padding: '1.5rem',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '2rem',
        boxShadow: '0 0 10px rgba(255,255,255,0.05)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{formatTime(timeLeft)}</div>
        <button
          onClick={() => setIsRunning(!isRunning)}
          style={{ padding: '0.5rem 1.2rem', marginRight: '1rem', background: '#00c896', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => { setIsRunning(false); setTimeLeft(25 * 60); }}
          style={{ padding: '0.5rem 1.2rem', background: '#f05454', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}
        >
          Reset
        </button>
      </div>

      {/* Music Section */}
      <div style={{
        background: '#2d2d2d',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(255,255,255,0.05)'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>🎵 Focus Music</h2>

        {/* Search */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs or artists"
            style={{
              flex: 1,
              padding: '0.6rem',
              borderRadius: '8px',
              border: '1px solid #555',
              backgroundColor: '#1c1c1c',
              color: '#fff'
            }}
          />
          <button
            onClick={handleSearch}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: 'none', backgroundColor: '#0077ff', color: '#fff', cursor: 'pointer' }}
          >
            Search
          </button>
        </div>

        {/* Now Playing */}
        {currentSong && (
          <div style={{ marginBottom: '1rem', padding: '1rem', background: '#3a3a3a', borderRadius: '8px' }}>
            <strong>Now Playing:</strong><br />
            {currentSong.name} — {currentSong.artist_name}
            <button
              onClick={toggleMusic}
              style={{ marginLeft: '1rem', padding: '0.3rem 0.8rem', borderRadius: '6px', background: '#444', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              {isMusicPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        )}

        {/* Song List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {songs.map((song) => (
            <div
              key={song.id}
              onClick={() => handleSongClick(song)}
              style={{
                cursor: 'pointer',
                background: '#1c1c1c',
                padding: '0.75rem',
                borderRadius: '10px',
                transition: '0.2s',
                textAlign: 'left'
              }}
            >
              <img src={song.album_image} width="100%" height="100px" style={{ borderRadius: '6px', objectFit: 'cover' }} />
              <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>{song.name}</div>
              <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{song.artist_name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
