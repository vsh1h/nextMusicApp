'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function PlayerPage() {
    const router = useRouter();
    
    const goHome = () => {
            router.push('/');
    };
    const { id } = useParams();
    const [song, setSong] = useState(null);

    useEffect(() => {
        async function fetchSong() {
        const clientId = 'b5e1d1ac';
        const res = await fetch(
            `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&id=${id}&format=json&audioformat=mp31`
        );
        const data = await res.json();
        setSong(data.results[0]);
        }

        fetchSong();
    }, [id]);

    if (!song) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>

        <video autoPlay loop muted playsInline style={styles.backgroundVideo}>
            
            <source src="/backgrounds/vecteezy_sound-equalizer-digital-music-or-sound-wave-footage_4450598.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <div style={styles.content}>
            <img
            src={song.album_image}
            width={200}
            height={200}
            alt="Album Art"
            style={styles.image}
            />
            <h2 style={styles.songTitle}>{song.name}</h2>
            <p style={styles.artist}>{song.artist_name}</p>
            <audio controls src={song.audio} style={styles.audio} />
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

    const styles = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
    },
    content: {
        position: 'relative',
        zIndex: 1,
        color: '#fff',
        textAlign: 'center',
        padding: '2rem',
        backdropFilter: 'blur(5px)',
        borderRadius: '12px',
    },
    image: {
        borderRadius: '12px',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
    },
    songTitle: {
        fontSize: '1.8rem',
        margin: '1rem 0 0.5rem',
    },
    artist: {
        fontSize: '1.2rem',
        marginBottom: '1rem',
    },
    audio: {
        width: '80%',
        maxWidth: '400px',
    },
    loading: {
        color: '#fff',
        padding: '2rem',
        textAlign: 'center',
    },
    };
