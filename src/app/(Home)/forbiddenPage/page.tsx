"use client"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RiLock2Fill } from "react-icons/ri";  

const ForbiddenPage = () => {
  const router = useRouter();

  const goBack = () => {
    router.back(); // Navigate to the previous route
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full text-center border border-gray-100">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="flex justify-center mb-6"
        >
          <RiLock2Fill className="text-6xl text-red-600" />
        </motion.div>
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-red-600 mb-4">403</h1>
          <p className="text-2xl text-gray-800 font-semibold mb-2">
            Access Forbidden
          </p>
          <p className="text-gray-500">
            You do not have permission to access this page. Please contact the
            administrator if you believe this is a mistake.
          </p>
        </div>
        <button
          onClick={goBack}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;