import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from "framer-motion";

const SearchModel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.02 }}
      className="w-full px-6 py-4 flex ">
      <form className="flex items-center bg-neutral-800 rounded-md px-3 py-2  w-full shadow-sm">
        <FaSearch className="text-gray-500 mr-2 text-sm" />
        <input
          type="text"
          id="search-input"
          placeholder="Search workouts..."
          className="bg-transparent outline-none w-full text-sm text-white   placeholder-gray-400"
        />
      </form>
    </motion.div>
  );
};

export default SearchModel;
