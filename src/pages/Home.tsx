import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleOpenGift = () => {
    navigate("/info"); // 👉 điều hướng mới
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-center">
      <img
        src="/images/gift.png"
        alt="Gift Box"
        className="w-48 h-48 hover:scale-105 transition-transform animate-bounce"
      />
      <button
        onClick={handleOpenGift}
        className="mt-4 px-6 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600"
      >
        Mở hộp 🎁
      </button>
    </div>
  );
};

export default Home;
