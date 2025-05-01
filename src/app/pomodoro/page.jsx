'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function PomodoroPage() {
    const router = useRouter();

    const goHome = () => {
        router.push('/');
    };

    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [workDuration, setWorkDuration] = useState(25); // in minutes
    const [breakDuration, setBreakDuration] = useState(5); // in minutes
    const [isBreak, setIsBreak] = useState(false);
    const [timeLeft, setTimeLeft] = useState(workDuration * 60);
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
        setTimeLeft((isBreak ? breakDuration : workDuration) * 60);
    }, [workDuration, breakDuration, isBreak]);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (isRunning && timeLeft === 0) {
            setIsRunning(false);
            if (!isBreak) {
                alert("Work session complete! Click 'Start Break' to begin your break.");
            } else {
                alert("Break Over! Back to work.");
                setIsBreak(false);
                setTimeLeft(workDuration * 60);
            }
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, isBreak]);

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

    const handleWorkChange = (value) => {
        const newValue = Math.max(25, Number(value));
        setWorkDuration(newValue);
    };

    const handleBreakChange = (value) => {
        const newValue = Math.max(5, Number(value));
        setBreakDuration(newValue);
    };

    return (
        <div style={{
            padding: '2rem',
            background: '#1e1e1e',
            color: '#fff',
            minHeight: '100vh',
            fontFamily: 'sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>⏰ Pomodoro Timer</h1>

                <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <label>Work Duration:
                        <input type="number" min="25" value={workDuration} onChange={(e) => handleWorkChange(e.target.value)} style={{ marginLeft: '0.5rem', width: '60px', padding: '0.4rem', borderRadius: '6px', border: '1px solid #555', backgroundColor: '#2d2d2d', color: '#fff' }} />
                    </label>
                    <label>Break Duration:
                        <input type="number" min="5" value={breakDuration} onChange={(e) => handleBreakChange(e.target.value)} style={{ marginLeft: '0.5rem', width: '60px', padding: '0.4rem', borderRadius: '6px', border: '1px solid #555', backgroundColor: '#2d2d2d', color: '#fff' }} />
                    </label>
                </div>

                <div style={{ background: '#2d2d2d', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem', boxShadow: '0 0 10px rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{formatTime(timeLeft)}</div>
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        style={{ padding: '0.5rem 1.2rem', marginRight: '1rem', background: '#00c896', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}
                    >
                        {isRunning ? 'Pause' : 'Start'}
                    </button>
                    <button
                        onClick={() => { setIsRunning(false); setIsBreak(false); setTimeLeft(workDuration * 60); }}
                        style={{ padding: '0.5rem 1.2rem', background: '#f05454', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', marginRight:'1rem' }}
                    >
                        Reset
                    </button>

                    {!isRunning && timeLeft === 0 && !isBreak && (
                        <button
                            onClick={() => {
                                setIsBreak(true);
                                setTimeLeft(breakDuration * 60);
                                setIsRunning(true);
                            }}
                            style={{ padding: '0.5rem 1.2rem', background: '#ffaa00', border: 'none', borderRadius: '8px', color: '#000', cursor: 'pointer', marginTop: '1rem' }}
                        >
                            Start Break
                        </button>
                    )}
                </div>

                <div style={{ background: '#2d2d2d', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 0 10px rgba(255,255,255,0.05)' }}>
                    <h2 style={{ marginBottom: '1rem' }}>🎵 Focus Music</h2>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for songs or artists"
                            style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid #555', backgroundColor: '#1c1c1c', color: '#fff' }}
                        />
                        <button
                            onClick={handleSearch}
                            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: 'none', backgroundColor: '#0077ff', color: '#fff', cursor: 'pointer' }}
                        >
                            Search
                        </button>
                    </div>

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

            <button
                onClick={goHome}
                style={{
                    padding: '0.7rem 1.5rem',
                    backgroundColor: '#ffd700',
                    color: '#121212',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: '0.3s',
                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
                    display: 'block',
                    margin: '0 auto',
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                Back to Home
            </button>
        </div>
    );
}
