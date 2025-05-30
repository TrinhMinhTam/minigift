import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const VideoPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  audioRef.current?.play().catch(console.warn);
  const handleVideoEnd = () => {
    setShowConfetti(true);

    // Sau 5 giây → điều hướng tới /messages
    setTimeout(() => {
      navigate("/messages");
    }, 5000);
  };

  return (
    <div className="relative p-4 text-center bg-yellow-50 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">🎬 Thước phim ngắn</h2>
      <audio
        ref={audioRef}
        src="/audio/votay.mp3"
        autoPlay={false}
        loop
        hidden
      />
      <video
        ref={videoRef}
        src="/video/kyniem.mp4"
        controls
        onEnded={handleVideoEnd}
        className="w-full max-w-3xl rounded shadow-lg"
      />

      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={500}
            recycle={false}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPage;
