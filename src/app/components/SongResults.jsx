import { useRouter } from 'next/navigation';

export default function SongResults({ songs }) {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Related Songs</h3>
      <div style={styles.songList}>
        {songs.map((song) => (
          <div
            key={song.id}
            onClick={() => router.push(`/player/${song.id}`)}
            style={styles.songCard}
          >
            <img
              src={song.album_image}
              width={100}
              height={100}
              style={styles.albumImage}
            />
            <div style={styles.songDetails}>
              <span style={styles.songName}>{song.name}</span>
              <span style={styles.artistName}>{song.artist_name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Styles for systematic and aesthetic design
const styles = {
  container: {
    padding: '1rem',
    maxWidth: '1200px', // Maximum width for the container
    margin: '0 auto',
    color: '#fff',
  },
  header: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: 'red',
  },
  songList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem', // Space between cards
    justifyContent: 'space-between',
  },
  songCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    padding: '1rem',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: '0.3s ease',
    width: '200px', // Set a fixed width for each card
    textAlign: 'center', // Center the text inside the card
  },
  albumImage: {
    borderRadius: '8px',
    objectFit: 'cover',
    transition: '0.3s ease',
  },
songDetails: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Optional: center-align text
  marginTop: '1rem',
},
songName: {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: '0.5rem', // adds space below the song name
},
artistName: {
  fontSize: '1rem',
  color: '#ccc',
},

};
