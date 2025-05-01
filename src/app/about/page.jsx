'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import themes from '../data/themes';

export default function AboutPage() {
    const router = useRouter();

    const goHome = () => {
        router.push('/'); 
    }
    const [hovered, setHovered] = useState({
        main: false,
        music: false,
        pomodoro: false,
        themes: false,
        themes1: false,
    });

    return (
        <div style={{ padding: '2rem', background: '#121212', color: '#fefefe', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <section style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1
            style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                color: '#ffd700',
                textShadow: hovered.main ? '0 0 10px #ffd700, 0 0 20px #ffd700' : 'none',
                transition: 'text-shadow 0.3s ease',
            }}
            onMouseEnter={() => setHovered((prev) => ({ ...prev, main: true }))}
            onMouseLeave={() => setHovered((prev) => ({ ...prev, main: false }))}
            >
            About Us
            </h1>

            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.6', color: '#ccc' }}>
            Welcome to <strong>Mood Muse</strong> – your ultimate companion for productivity and peace.
            Our app combines the proven Pomodoro technique with relaxing music from Jamendo to help you stay focused, energized, and relaxed.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ background: '#1e1e1e', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 0 10px rgba(255, 215, 0, 0.2)' }}>
                <h3
                style={{
                    color: '#00c896',
                    marginBottom: '0.5rem',
                    textShadow: hovered.music ? '0 0 8px #00c896, 0 0 12px #00c896' : 'none',
                    transition: 'text-shadow 0.3s ease',
                }}
                onMouseEnter={() => setHovered((prev) => ({ ...prev, music: true }))}
                onMouseLeave={() => setHovered((prev) => ({ ...prev, music: false }))}
                >
                🎧 Music & Mood
                </h3>
                <p style={{ fontSize: '1rem', color: '#bbb' }}>
                Our curated Jamendo tracks help you tune into your flow state. Pick a vibe, play a song, and let your mind focus.
                </p>
            </div>

            <div style={{ background: '#1e1e1e', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 0 10px rgba(255, 215, 0, 0.2)' }}>
                <h3
                style={{
                    color: '#00c896',
                    marginBottom: '0.5rem',
                    textShadow: hovered.pomodoro ? '0 0 8px #00c896, 0 0 12px #00c896' : 'none',
                    transition: 'text-shadow 0.3s ease',
                }}
                onMouseEnter={() => setHovered((prev) => ({ ...prev, pomodoro: true }))}
                onMouseLeave={() => setHovered((prev) => ({ ...prev, pomodoro: false }))}
                >
                ⏳ Pomodoro Timing
                </h3>
                <p style={{ fontSize: '1rem', color: '#bbb' }}>
                Designed to optimize your productivity with 25-minute work sprints and 5-minute breaks. It's scientifically backed and simple.
                </p>
            </div>
            </div>

            <div style={{ background: '#1e1e1e', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 0 10px rgba(255, 215, 0, 0.2)', marginBottom: '2rem' }}>
            <h3
                style={{
                color: '#00c896',
                marginBottom: '0.5rem',
                textShadow: hovered.themes1 ? '0 0 8px #00c896, 0 0 12px #00c896' : 'none',
                transition: 'text-shadow 0.3s ease',
                }}
                onMouseEnter={() => setHovered((prev) => ({ ...prev, themes1: true }))}
                onMouseLeave={() => setHovered((prev) => ({ ...prev, themes1: false }))}
            >
                💡 Tips
            </h3>
            <p style={{ fontSize: '1rem', color: '#bbb' }}>
            On the <strong>Dashboard</strong> and in the <strong>Pomodoro section</strong>, you can click the <strong>Search</strong> button — even without typing — to instantly discover songs. In the <strong>Pomodoro section</strong>, once you hit play, the music will continue playing in the background as you work!
            </p>
            </div>

            <div style={{ background: '#1e1e1e', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 0 10px rgba(255, 215, 0, 0.2)', marginBottom: '2rem' }}>
            <h3
                style={{
                color: '#00c896',
                marginBottom: '0.5rem',
                textShadow: hovered.themes ? '0 0 8px #00c896, 0 0 12px #00c896' : 'none',
                transition: 'text-shadow 0.3s ease',
                }}
                onMouseEnter={() => setHovered((prev) => ({ ...prev, themes: true }))}
                onMouseLeave={() => setHovered((prev) => ({ ...prev, themes: false }))}
            >
                🎨 Theme & Background Customization
            </h3>
            <p style={{ fontSize: '1rem', color: '#bbb' }}>
                You can easily personalize your experience by selecting a theme that matches your current mood. Simply click on one of the mood emojis or explore the available theme buttons in the sidebar.
                Your background will adapt instantly to keep your workspace visually inspiring and emotionally supportive.
            </p>
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
                marginTop: '2rem',
                cursor: 'pointer',
                transition: '0.3s',
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
            }}
            >
            Back to Home
            </button>

        <footer style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#777' }}>
          Made with ❤️ by Vanshika Shah • © 2025 Mood Muse
        </footer>
      </section>
    </div>
  );
}
