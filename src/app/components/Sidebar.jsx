'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import themes from '../data/themes';

function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert("Time's up!");
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div style={styles.pomodoroBox}>
      <h4>Pomodoro Timer</h4>
      <div style={styles.timer}>{formatTime(timeLeft)}</div>
      <div>
        <button onClick={() => setIsRunning(!isRunning)} style={styles.btn}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(25 * 60);
          }}
          style={{ ...styles.btn, marginLeft: '0.5rem' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ setSelectedTheme }) {
  const router = useRouter();

  const goToPomodoroPage = () => {
    router.push('/pomodoro');
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.heading}>Dashboard</h2>

      {/* Mood Selector */}
      <h3 style={styles.sectionTitle}>Mood Selector</h3>
      <div style={styles.emojiContainer}>
        <span onClick={() => setSelectedTheme('#1e1e1e')} style={styles.emoji}>😃</span> {/* Calm */}
        <span onClick={() => setSelectedTheme('#ffadad')} style={styles.emoji}>😊</span> {/* Happy */}
        <span onClick={() => setSelectedTheme('#ffd6a5')} style={styles.emoji}>🔥</span> {/* Energetic */}
        <span onClick={() => setSelectedTheme('#caffbf')} style={styles.emoji}>🙂‍↔️</span> {/* Relaxed */}
        <span onClick={() => setSelectedTheme('#9bf6ff')} style={styles.emoji}>😔</span> {/* Chill */}
      </div>

      {/* Pomodoro */}
      <h3 onClick={goToPomodoroPage} style={{ ...styles.menuItem, cursor: 'pointer' }}>Pomodoro</h3>

      {/* Theme Selector */}
      <h3 style={styles.sectionTitle}>Theme Selector</h3>
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setSelectedTheme(t.background)}
          style={styles.themeBtn}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: '250px',
    padding: '1.5rem 1rem',
    backgroundColor: '#111',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  heading: {
    fontSize: '1.6rem',
    marginBottom: '1.2rem',
  },
  sectionTitle: {
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  emojiContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '1rem',
  },
  emoji: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  pomodoroBox: {
    marginTop: '1rem',
    padding: '0.5rem 0',
  },
  timer: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  btn: {
    padding: '0.4rem 0.8rem',
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  pomodoroNavBtn: {
    marginTop: '0.5rem',
    background: '#222',
    color: '#fff',
    padding: '0.3rem 0.6rem',
    border: '1px solid #444',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  themeBtn: {
    marginTop: '0.5rem',
    padding: '0.3rem 0.6rem',
    backgroundColor: '#222',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
