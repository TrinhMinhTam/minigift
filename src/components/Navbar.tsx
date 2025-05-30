import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/gallery", label: "Thư viện ảnh" },
    { path: "/messages", label: "Lời nhắn" },
    { path: "/quiz", label: "Trò chơi" },
    { path: "/timeline", label: "Hành trình" },
    { path: "/goodbye", label: "Tạm biệt" },
  ];

  return (
    <nav className="sticky w-full h-[50px] top-0 z-50 bg-white shadow-md px-4 py-2 flex justify-center gap-4">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`${
              isActive ? "text-blue-600 font-bold underline" : "text-gray-700"
            } hover:text-blue-500 transition`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
