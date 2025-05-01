import AudioPlayer from './components/AudioPlayer';

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <AudioPlayer />
        {children}
      </body>
    </html>
  );
}
