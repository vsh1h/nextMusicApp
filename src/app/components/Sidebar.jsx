'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import themes from '../data/themes';

export default function Sidebar({ setSelectedTheme }) {
  const router = useRouter();

  const goToPomodoroPage = () => router.push('/pomodoro');
  const goToAboutPage = () => router.push('/about');

  return (
    <div style={styles.sidebar}>
      <h1
        style={styles.glowText1}
        onMouseEnter={(e) => e.target.style.textShadow = '0 0 8px gold'}
        onMouseLeave={(e) => e.target.style.textShadow = 'none'}
      >
        Mood Muse
      </h1>

      <h3
        style={styles.glowText}
        onMouseEnter={(e) => e.target.style.textShadow = '0 0 6px gold'}
        onMouseLeave={(e) => e.target.style.textShadow = 'none'}
      >
        Mood Selector
      </h3>

      <div style={styles.emojiContainer}>
        <span onClick={() => setSelectedTheme('#1e1e1e')} style={styles.emoji}>😔</span>
        <span onClick={() => setSelectedTheme('#ffadad')} style={styles.emoji}>😊</span>
        <span onClick={() => setSelectedTheme('linear-gradient(to right, #ff7e5f, #feb47b)')} style={styles.emoji}>🌞</span>
        <span onClick={() => setSelectedTheme('#caffbf')} style={styles.emoji}>😌</span>
        <span onClick={() => setSelectedTheme('linear-gradient(to right, #000428, #004e92)')} style={styles.emoji}>😎</span>
      </div>

      <h3
        onClick={goToPomodoroPage}
        style={{ ...styles.glowText, cursor: 'pointer' }}
        onMouseEnter={(e) => e.target.style.textShadow = '0 0 6px gold'}
        onMouseLeave={(e) => e.target.style.textShadow = 'none'}
      >
        Pomodoro
      </h3>

      <h3
        style={styles.glowText}
        onMouseEnter={(e) => e.target.style.textShadow = '0 0 6px gold'}
        onMouseLeave={(e) => e.target.style.textShadow = 'none'}
      >
        Theme Selector
      </h3>

      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setSelectedTheme(t.background)}
          style={styles.themeBtn}
        >
          {t.name}
        </button>
      ))}

      <h3
        onClick={goToAboutPage}
        style={{ ...styles.glowText, cursor: 'pointer', marginTop: '2rem' }}
        onMouseEnter={(e) => e.target.style.textShadow = '0 0 6px gold'}
        onMouseLeave={(e) => e.target.style.textShadow = 'none'}
      >
        About Us
      </h3>

      <a
        href="https://github.com/vsh1h/nextMusicApp"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: '1rem'}}
      >
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub"
          width={40}
          height={40}
          style={{ filter: 'invert(1)', cursor: 'pointer' }}
        />
      </a>
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
  glowText1: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    transition: 'text-shadow 0.3s ease',
  },
  glowText: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    transition: 'text-shadow 0.3s ease',
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
