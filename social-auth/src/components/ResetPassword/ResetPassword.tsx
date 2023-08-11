import { FC, useState } from "react";

interface ResetPasswordProps {
  // defining type it's function type with no return type.
  isOpen: boolean;
  onClose: () => void;
}

const ResetPassword: FC<ResetPasswordProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0  z-10 flex justify-center items-center"
      style={{ transform: `translateY(${isOpen ? "0%" : "-100%"})` }}
    >
      <div className="bg-white rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-4">Password Reset</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="bg-blue-300 w-full text-white py-2 px-4 rounded-lg"
        />
        <button className="bg-blue-500 w-full text-white  py-2 px-4 rounded-lg mt-5">
          Reset Password
        </button>

        <button
          onClick={onClose}
          className="text-gray-500 mt-4 text-sm underline hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
