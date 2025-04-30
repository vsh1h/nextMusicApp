// File: app/layout.js
import AudioPlayer from './components/AudioPlayer';

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <AudioPlayer />  {/* Global AudioPlayer to play music */}
        {children}
      </body>
    </html>
  );
}
