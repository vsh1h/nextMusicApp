// File: app/components/AudioPlayer.jsx
'use client';

import { useEffect, useState } from 'react';

export default function AudioPlayer() {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const fetchMusic = async () => {
      const clientId = 'b5e1d1ac';
      const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=1&order=popularity`);
      const data = await res.json();
      const track = data.results[0];

      if (track && track.audio) {
        const audioElement = new Audio(track.audio);  // Jamendo track URL
        audioElement.loop = true;  // Music will loop
        setAudio(audioElement);
        audioElement.play();
      }
    };

    fetchMusic();

    // Cleanup when the component is unmounted
    return () => {
      if (audio) audio.pause();
    };
  }, []);

  return null;  // This component does not render anything visible, just plays audio
}
