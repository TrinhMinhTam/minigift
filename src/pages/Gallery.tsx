import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const imageUrls = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
];

const Gallery = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  audioRef.current?.play().catch(console.warn);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300); // delay nhẹ để tạo hiệu ứng
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, Date.now()]);
    }, 800);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      } p-4`}
    >
      <h2 className="text-3xl font-bold text-center mb-6">
        📸 Những khoảnh khắc đáng nhớ
      </h2>
      {hearts.map((id) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const size = Math.random() * 16 + 16;
        return (
          <div
            key={id}
            className="heart"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        );
      })}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="overflow-hidden rounded shadow hover:scale-105 transition-transform duration-300"
          >
            <img
              src={url}
              alt={`memory-${index}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
      <audio
        ref={audioRef}
        src="/audio/vuive.mp3"
        autoPlay={false}
        loop
        hidden
      />
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/video")}
          className="px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
        >
          Tiếp tục nàoooo 🎥
        </button>
      </div>
    </div>
  );
};

export default Gallery;
