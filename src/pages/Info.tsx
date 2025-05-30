import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Info = () => {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  audioRef.current?.play().catch(console.warn);
  useEffect(() => {
    setShowConfetti(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, Date.now()]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-pink-50  text-center overflow-hidden">
      {/* Trái tim bay */}
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
      <audio
        ref={audioRef}
        src="/audio/home.mp3"
        autoPlay={false}
        loop
        hidden
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
      {/* Nội dung giới thiệu */}
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-xl w-full space-y-6 z-10 relative animate-fade-in">
        <img
          src="/images/avata.jpg"
          alt="Profile"
          className="w-40 h-40 mx-auto rounded-full border-4 border-pink-300 shadow-md"
        />

        <h2 className="text-3xl font-bold text-pink-600">
          🔮Trương Khắc Trương Nhi 🔮
        </h2>
        <p className="text-gray-700 text-base italic">
          <strong> Câu cửa miệng:</strong>
          "Hông sao hết, phải tin em", "Cà phê hông mọi người", "Chị muốn coi
          cái gì"
        </p>

        <div className="text-left space-y-2 text-gray-800 mt-4">
          <p>
            <strong>💼 Vị trí:</strong> Social Media Intern
          </p>
          <p>
            <strong>🏷️ Biệt danh:</strong> Nhỏ bé Nhy
          </p>
          <p>
            <strong>💬 Bé Nhy từng nói:</strong> Bé Nhy được cấu thành từ hai
            thứ: con người và còn ten.
          </p>
          <p>
            <strong>😄 Đặc điểm nhận dạng:</strong> Người giữ vững phong độ mặc
            đồ đi làm đẹp và chỉnh tề nhất văn phòng.
          </p>
        </div>

        <button
          onClick={() => navigate("/gallery")}
          className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition"
        >
          Xem những khoảnh khắc đáng nhớ 📸
        </button>
      </div>
    </div>
  );
};

export default Info;
