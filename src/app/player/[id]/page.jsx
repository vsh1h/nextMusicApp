// File: app/player/[id]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function PlayerPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    async function fetchSong() {
      const clientId = 'b5e1d1ac';
      const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&id=${id}&format=json&audioformat=mp31`);
      const data = await res.json();
      setSong(data.results[0]);
    }
    fetchSong();
  }, [id]);

  if (!song) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <img src={song.album_image} width={200} height={200} />
      <h2>{song.name}</h2>
      <p>{song.artist_name}</p>
      <audio controls src={song.audio} style={{ marginTop: '1rem' }} />
    </div>
  );
}
