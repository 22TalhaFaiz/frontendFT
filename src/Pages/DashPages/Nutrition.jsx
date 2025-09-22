import { Clipboard, Search, Utensils, TrendingUp, Calendar, Target, Sparkles, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import API_URL from  '../config.js'

const Nutrition = () => {
  const [formData, setFormData] = useState({
    food: "",
    category: "Snack",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    servingSize: "100g",
    goal: "Maintain",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [nutritionHistory, setNutritionHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ Fetch existing nutrition logs from DB
  const fetchNutritionHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/api/nutrition/g`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setNutritionHistory(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Error fetching history:", err);
      setNutritionHistory([]);
    }
  };

  useEffect(() => {
    fetchNutritionHistory();
  }, []);

  // ✅ Auto-fetch nutrition data
  useEffect(() => {
    const fetchNutritionData = async () => {
      if (!formData.food.trim() || formData.food.length < 3) {
        setFormData((prev) => ({
          ...prev,
          calories: "",
          protein: "",
          carbs: "",
          fats: "",
        }));
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        // Send full form data (including serving size)
        const response = await fetch("http://localhost:3008/api/nutrition", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ food: formData.food }),
          credentials: "include",

        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Something went wrong");

        // ✅ Scale macros according to servingSize if needed
        const servingValue = parseFloat(formData.servingSize) || 100; // default 100g
        const ratio = servingValue / 100;

        setFormData((prev) => ({
          ...prev,
          calories: Math.round((result.calories || 0) * ratio),
          protein: Math.round((result.protein || 0) * ratio),
          carbs: Math.round((result.carbs || 0) * ratio),
          fats: Math.round((result.fats || 0) * ratio),
        }));
      } catch (error) {
        console.error("Error fetching nutrition data:", error.message);
        setError(error.message);
        setFormData((prev) => ({
          ...prev,
          calories: "",
          protein: "",
          carbs: "",
          fats: "",
        }));
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchNutritionData, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData.food, formData.servingSize]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  // ✅ Save nutrition data to MongoDB
  const handleSaveNutrition = async () => {
    if (!formData.food.trim()) {
      setError("Please enter a food name");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3008/api/nutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Something went wrong");

      setNutritionHistory((prev) =>
        Array.isArray(prev) ? [result, ...prev] : [result]
      );

      // ✅ Reset form after saving
      setFormData({
        food: "",
        category: "Snack",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        servingSize: "",
        goal: "Maintain",
        notes: "",
      });
    } catch (error) {
      console.error("Error saving nutrition data:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter nutrition history based on search query and category
  const filteredHistory = nutritionHistory.filter(item => {
    const matchesSearch = searchQuery === "" ||
      item.food.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Clear search filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  // Calculate daily totals
  const dailyTotals = nutritionHistory
    .filter(item => new Date(item.date).toDateString() === new Date().toDateString())
    .reduce((totals, item) => ({
      calories: totals.calories + (item.calories || 0),
      protein: totals.protein + (item.protein || 0),
      carbs: totals.carbs + (item.carbs || 0),
      fats: totals.fats + (item.fats || 0),
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  // Get unique categories for filter dropdown
  const uniqueCategories = [...new Set(nutritionHistory.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-2 sm:p-4 lg:p-6">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-2xl mb-4 sm:mb-6 shadow-2xl shadow-purple-500/25 animate-pulse">
            <Utensils className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 sm:mb-4">
            NutriTracker Pro
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg font-medium">
            Smart nutrition tracking with AI-powered insights
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs sm:text-sm text-gray-500">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Automatically fetch nutrition data</span>
          </div>
        </div>

        {/* Daily Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {[
            { label: "Calories", value: dailyTotals.calories, unit: "kcal", color: "from-red-500 to-pink-500", icon: TrendingUp },
            { label: "Protein", value: dailyTotals.protein, unit: "g", color: "from-green-500 to-emerald-500", icon: Target },
            { label: "Carbs", value: dailyTotals.carbs, unit: "g", color: "from-yellow-500 to-orange-500", icon: Calendar },
            { label: "Fats", value: dailyTotals.fats, unit: "g", color: "from-purple-500 to-indigo-500", icon: Sparkles },
          ].map(({ label, value, unit, color, icon: Icon }) => (
            <div key={label} className="group">
              <div className={`bg-gradient-to-br ${color} p-0.5 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 h-full">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white/70" />
                    <span className="text-xs text-gray-400 font-medium">Today</span>
                  </div>
                  <div className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1`}>
                    {value.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {label} <span className="text-gray-500">({unit})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-slate-900/50">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Clipboard className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Add New Food</h2>
              </div>

              {error && (
                <div className="bg-red-900/30 backdrop-blur-sm border border-red-500/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-6 animate-pulse">
                  <p className="text-red-400 text-sm sm:text-base">⚠️ {error}</p>
                </div>
              )}

              <div className="space-y-4 sm:space-y-6">
                {/* Food Name with Loading State */}
                <div className="relative">
                  <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2 sm:mb-3">
                    Food Name
                  </label>
                  <div className="relative">
                    <input
                      value={formData.food}
                      onChange={(e) => handleChange("food", e.target.value)}
                      className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 text-sm sm:text-base focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Type any food item... (e.g., Chicken Breast, Apple)"
                    />
                    {isLoading && formData.food && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  {formData.food && (
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {isLoading ? "Fetching nutrition data..." : "Auto-updated nutrition info"}
                    </p>
                  )}
                </div>

                {/* Form Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-white text-sm sm:text-base focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      <option value="Breakfast">🌅 Breakfast</option>
                      <option value="Lunch">🥗 Lunch</option>
                      <option value="Dinner">🍽️ Dinner</option>
                      <option value="Snack">🍎 Snack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2">
                      Serving Size
                    </label>
                    <input
                      value={formData.servingSize}
                      onChange={(e) => handleChange("servingSize", e.target.value)}
                      className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-white placeholder-gray-400 text-sm sm:text-base focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="100g, 1 cup, 1 slice"
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2">
                      Goal
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => handleChange("goal", e.target.value)}
                      className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-white text-sm sm:text-base focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      <option value="Maintain">⚖️ Maintain</option>
                      <option value="Cutting">✂️ Cutting</option>
                      <option value="Bulking">💪 Bulking</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    rows={3}
                    className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-white placeholder-gray-400 text-sm sm:text-base focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                    placeholder="Add any additional notes..."
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveNutrition}
                  disabled={isLoading || !formData.food.trim()}
                  className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Save Nutrition Data
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Nutrition Stats Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Nutrition Preview</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { field: "calories", label: "Calories", color: "from-red-400 to-pink-500", unit: "kcal" },
                  { field: "protein", label: "Protein", color: "from-green-400 to-emerald-500", unit: "g" },
                  { field: "carbs", label: "Carbs", color: "from-yellow-400 to-orange-500", unit: "g" },
                  { field: "fats", label: "Fats", color: "from-purple-400 to-indigo-500", unit: "g" },
                ].map(({ field, label, color, unit }) => (
                  <div key={field} className="group">
                    <div className={`bg-gradient-to-r ${color} p-0.5 rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                      <div className="bg-slate-900/80 rounded-xl p-3 sm:p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm sm:text-base font-medium text-gray-300">{label}</span>
                          <span className="text-xs text-gray-500">{unit}</span>
                        </div>
                        <div className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                          {formData[field] || "--"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* History Table with Search */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Nutrition History</h2>
            </div>

            {/* Search Bar and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search foods or notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 text-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative min-w-48">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none"
                  >
                    <option value="">All Categories</option>
                    {uniqueCategories.map(category => (
                      <option key={category} value={category}>
                        {category === "Breakfast" && "🌅"}
                        {category === "Lunch" && "🥗"}
                        {category === "Dinner" && "🍽️"}
                        {category === "Snack" && "🍎"}
                        {" " + category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters Button */}
                {(searchQuery || selectedCategory) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 rounded-xl transition-all duration-200 whitespace-nowrap"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-400">
                Showing {filteredHistory.length} of {nutritionHistory.length} entries
                {(searchQuery || selectedCategory) && (
                  <span className="ml-2">
                    {searchQuery && `• Search: "${searchQuery}"`}
                    {selectedCategory && `• Category: ${selectedCategory}`}
                  </span>
                )}
              </div>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
               <div className="overflow-x-auto">
  <table className="min-w-[800px] md:min-w-full border-collapse">
    <thead>
      <tr className="bg-slate-700/50">
        <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-300">Food</th>
        <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-300">Category</th>
        <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-300">Cal</th>
        <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden md:table-cell">Protein</th>
        <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden md:table-cell">Carbs</th>
        <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden md:table-cell">Fats</th>
        <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden lg:table-cell">Serving</th>
        <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden lg:table-cell">Goal</th>
        <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-300 hidden xl:table-cell">Notes</th>
        <th className="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-300">Date</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-700/50">
      {filteredHistory.length > 0 ? filteredHistory.map((item, index) => (
        <tr key={item._id} className="hover:bg-slate-700/30 transition-colors duration-200">
          <td className="px-3 py-2 text-xs sm:text-sm text-white font-medium">{item.food}</td>
          <td className="px-3 py-2 text-xs sm:text-sm text-gray-300">
            <span className="inline-flex px-2 py-1 rounded-full text-xs bg-slate-700 text-gray-300">{item.category}</span>
          </td>
          <td className="px-3 py-2 text-xs sm:text-sm text-red-400 font-semibold">{item.calories}</td>
          <td className="px-3 py-2 text-xs sm:text-sm text-green-400 font-semibold hidden md:table-cell">{item.protein}g</td>
          <td className="px-3 py-2 text-xs sm:text-sm text-yellow-400 font-semibold hidden md:table-cell">{item.carbs}g</td>
          <td className="px-3 py-2 text-xs sm:text-sm text-purple-400 font-semibold hidden md:table-cell">{item.fats}g</td>
          <td className="px-3 py-2 text-gray-400 hidden lg:table-cell">{item.servingSize}</td>
          <td className="px-3 py-2 text-gray-400 hidden lg:table-cell">{item.goal}</td>
          <td className="px-3 py-2 text-xs sm:text-sm text-gray-400 hidden xl:table-cell truncate max-w-[120px]">{item.notes || "--"}</td>
          <td className="px-3 py-2 text-xs sm:text-sm text-gray-400">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
        </tr>
      )) : (
        <tr>
          <td colSpan="10" className="text-center py-6 text-gray-400">No nutrition data found</td>
        </tr>
      )}
    </tbody>
  </table>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;