// Import các hook cần dùng từ React
import { useState, useEffect } from "react";

// URL API của SheetDB để lấy và gửi dữ liệu từ Google Sheet
const SHEETDB_URL = "https://sheetdb.io/api/v1/fujsexg48933z";

// Interface định nghĩa kiểu dữ liệu cho từng lời nhắn
interface Message {
  name: string;
  text: string;
}

const Messages = () => {
  // Danh sách lời nhắn lấy từ SheetDB
  const [messages, setMessages] = useState<Message[]>([]);

  // Trạng thái của form nhập liệu
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  // useEffect để gọi API mỗi 3 giây lấy dữ liệu mới
  useEffect(() => {
    const fetchData = () => {
      fetch(SHEETDB_URL)
        .then((res) => res.json())
        .then((data) => {
          const valid = data.filter((msg: Message) => msg.name && msg.text);
          setMessages(valid); // cập nhật danh sách lời nhắn
        }); // cập nhật danh sách lời nhắn
    };

    fetchData(); // gọi ngay khi component mount
    // const interval = setInterval(fetchData, 1000); // gọi lại mỗi 3 giây

    // return () => clearInterval(interval); // dọn dẹp khi unmount
  }, []);

  // Gửi dữ liệu từ form về SheetDB
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return; // kiểm tra input hợp lệ

    const newMsg = { name, text };

    await fetch(SHEETDB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [newMsg] }),
    });

    // Thêm tạm vào danh sách (sẽ được đồng bộ lại sau 3 giây)
    setMessages([...messages, newMsg]);
    setName("");
    setText("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        📓 Sổ lưu bút chia tay
      </h2>

      {/* Danh sách lời nhắn được render thành từng thẻ sticker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`bg-pink-100 p-4 rounded-xl shadow-md transform rotate-${
              ((index % 3) - 1) * 2
            } transition`}
          >
            <p className="text-sm text-center font-bold text-pink-700 mb-2">
              {msg.name}
            </p>
            <p className="italic text-gray-700">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Form gửi lời nhắn */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 m-4 rounded shadow space-y-4 border border-gray-300"
      >
        <h3 className="text-xl font-semibold">✍️ Gửi lời nhắn của bạn</h3>

        <input
          type="text"
          placeholder="Tên của bạn"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Lời chúc hoặc cảm xúc..."
          className="w-full border p-2 rounded"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Gửi lời nhắn 💌
        </button>
      </form>
    </div>
  );
};

export default Messages;
