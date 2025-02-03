import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 dark:from-gray-800 dark:to-gray-900 py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          FAANG Interview Preparation with Mohit
        </h1>

        {/* Subtitle */}
        <p className="text-gray-100 dark:text-gray-400 text-lg mb-10">
          Master the Essentials: Crack Interviews with Comprehensive System Design & DSA Tutorials
        </p>

        {/* Search Form */}
        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-lg mx-auto mb-6"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none px-6 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none"
          />
          <Button
            type="submit"
            className="bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-3 rounded-r-full hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-all"
          >
            Search
          </Button>
        </form>

        {/* Explore Courses Button */}
        <Button
          onClick={() => navigate(`/course/search?query=`)}
          className="bg-indigo-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-6 py-3 font-medium rounded-full hover:bg-indigo-200 dark:hover:bg-gray-700 shadow-md transition-all"
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
