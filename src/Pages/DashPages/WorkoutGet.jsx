import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Loader2, 
  Dumbbell, 
  Trash2, 
  Calendar, 
  Clock, 
  Flame, 
  Plus, 
  Target, 
  Activity,
  Search,
  Filter,
  X,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from  '../config.js'



const GetWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/workouts`, { withCredentials: true });
        setWorkouts(res.data);
        setFilteredWorkouts(res.data);
      } catch (err) {
        console.error("Failed to fetch workouts:", err);
        toast.error('❌ Failed to fetch workouts', { 
          theme: 'dark',
          style: {
            background: '#1e1b4b',
            border: '1px solid #7c3aed',
            color: '#e2e8f0'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Search and filter logic
  useEffect(() => {
    let filtered = [...workouts];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(workout =>
        workout.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.exercises?.some(ex => 
          ex.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ex.notes?.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        new Date(workout.date).toLocaleDateString().includes(searchQuery)
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(workout => 
        workout.type?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'duration':
          aValue = a.duration || 0;
          bValue = b.duration || 0;
          break;
        case 'calories':
          aValue = a.caloriesBurned || 0;
          bValue = b.caloriesBurned || 0;
          break;
        case 'exercises':
          aValue = a.exercises?.length || 0;
          bValue = b.exercises?.length || 0;
          break;
        case 'title':
          aValue = a.title?.toLowerCase() || '';
          bValue = b.title?.toLowerCase() || '';
          break;
        default:
          aValue = a.title?.toLowerCase() || '';
          bValue = b.title?.toLowerCase() || '';
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredWorkouts(filtered);
  }, [workouts, searchQuery, selectedType, sortBy, sortOrder]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) return;

    try {
      await axios.delete(`${API_URL}/api/workouts/${id}`, { withCredentials: true });
      setWorkouts(prev => prev.filter(w => w._id !== id));
      toast.success('✅ Workout deleted successfully', { 
        theme: 'dark',
        style: {
          background: '#1e1b4b',
          border: '1px solid #7c3aed',
          color: '#e2e8f0'
        }
      });
    } catch (err) {
      console.error('Failed to delete workout:', err);
      toast.error('❌ Failed to delete workout', { 
        theme: 'dark',
        style: {
          background: '#1e1b4b',
          border: '1px solid #7c3aed',
          color: '#e2e8f0'
        }
      });
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSortBy('date');
    setSortOrder('desc');
  };

  const getTypeColor = (type) => {
    const colors = {
      cardio: 'from-red-500 to-pink-500',
      strength: 'from-blue-500 to-cyan-500',
      flexibility: 'from-green-500 to-emerald-500',
      sports: 'from-orange-500 to-yellow-500',
      default: 'from-purple-500 to-indigo-500'
    };
    return colors[type?.toLowerCase()] || colors.default;
  };

  const getTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'cardio': return <Flame className="w-4 h-4" />;
      case 'strength': return <Dumbbell className="w-4 h-4" />;
      case 'flexibility': return <Target className="w-4 h-4" />;
      case 'sports': return <Activity className="w-4 h-4" />;
      default: return <Dumbbell className="w-4 h-4" />;
    }
  };

  const getUniqueTypes = () => {
    const types = [...new Set(workouts.map(w => w.type?.toLowerCase()).filter(Boolean))];
    return types.map(type => type.charAt(0).toUpperCase() + type.slice(1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-6 animate-pulse">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Workouts...</h2>
          <p className="text-slate-400">Getting your fitness journey ready</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 lg:p-8">
      <ToastContainer />
      
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl mb-4 sm:mb-6 shadow-2xl">
            <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Your Workouts
          </h1>
          <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-6 sm:mb-8">
            Track your fitness journey with detailed logs and achieve your goals
          </p>
          
          <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-semibold text-white shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Add New Workout</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search workouts, exercises, dates, types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white hover:border-purple-500/50 transition-all text-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Filters & Sort</span>
            </button>

            {/* Active Filters Indicator */}
            {(searchQuery || selectedType !== 'all' || sortBy !== 'date' || sortOrder !== 'desc') && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Active filters:</span>
                <button
                  onClick={clearFilters}
                  className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Workout Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-3 py-2 text-white text-sm focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                  >
                    <option value="all">All Types</option>
                    {getUniqueTypes().map(type => (
                      <option key={type} value={type.toLowerCase()}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-3 py-2 text-white text-sm focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                  >
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="duration">Duration</option>
                    <option value="calories">Calories</option>
                    <option value="exercises">Exercise Count</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Sort Order</label>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="w-full flex items-center justify-center gap-2 bg-slate-700/50 border border-slate-600/50 rounded-xl px-3 py-2 text-white text-sm hover:bg-slate-700/70 transition-colors"
                  >
                    {sortOrder === 'asc' ? (
                      <>
                        <SortAsc className="w-4 h-4" />
                        <span>Ascending</span>
                      </>
                    ) : (
                      <>
                        <SortDesc className="w-4 h-4" />
                        <span>Descending</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Counter */}
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Showing {filteredWorkouts.length} of {workouts.length} workouts
              {searchQuery && (
                <span className="ml-1">
                  for "<span className="text-purple-400 font-medium">{searchQuery}</span>"
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        {workouts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">{filteredWorkouts.length}</p>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    {filteredWorkouts.length !== workouts.length ? 'Filtered' : 'Total'} Workouts
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {filteredWorkouts.reduce((total, w) => total + (w.duration || 0), 0)}
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm">Total Minutes</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-xl border border-red-500/20 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {filteredWorkouts.reduce((total, w) => total + (w.caloriesBurned || 0), 0)}
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm">Calories Burned</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workouts List */}
        {filteredWorkouts.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-slate-800/50 rounded-full mb-6">
              {workouts.length === 0 ? (
                <Dumbbell className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
              ) : (
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {workouts.length === 0 ? 'No workouts found' : 'No matching workouts'}
            </h3>
            <p className="text-slate-400 text-sm sm:text-lg mb-6 sm:mb-8 max-w-md mx-auto">
              {workouts.length === 0 
                ? 'Start your fitness journey by creating your first workout session!'
                : 'Try adjusting your search terms or filters to find what you\'re looking for.'
              }
            </p>
            {workouts.length === 0 ? (
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl font-semibold text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Create First Workout</span>
                </div>
              </button>
            ) : (
              <button
                onClick={clearFilters}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl font-semibold text-white shadow-xl hover:shadow-slate-500/25 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Clear Filters</span>
                </div>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {filteredWorkouts.map((workout) => (
              <div key={workout._id} className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(workout.type)} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(workout._id)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 sm:p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-200 group/delete"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover/delete:scale-110 transition-transform duration-200" />
                </button>

                {/* Header */}
                <div className="relative z-10 mb-4 sm:mb-6">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${getTypeColor(workout.type)} rounded-xl flex items-center justify-center shadow-lg`}>
                      {getTypeIcon(workout.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 truncate pr-10 sm:pr-12">
                        {workout.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{new Date(workout.date).toLocaleDateString()}</span>
                        </div>
                        <div className={`px-2 sm:px-3 py-1 bg-gradient-to-r ${getTypeColor(workout.type)} bg-opacity-20 rounded-full text-xs font-medium text-white border border-white/10`}>
                          {workout.type}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-slate-700/30 rounded-xl p-2 sm:p-3 text-center">
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                        <span className="text-sm sm:text-lg font-bold text-white">{workout.duration}</span>
                      </div>
                      <p className="text-xs text-slate-400">Minutes</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-xl p-2 sm:p-3 text-center">
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                        <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                        <span className="text-sm sm:text-lg font-bold text-white">{workout.caloriesBurned || 0}</span>
                      </div>
                      <p className="text-xs text-slate-400">Calories</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-xl p-2 sm:p-3 text-center">
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                        <span className="text-sm sm:text-lg font-bold text-white">{workout.exercises?.length || 0}</span>
                      </div>
                      <p className="text-xs text-slate-400">Exercises</p>
                    </div>
                  </div>
                </div>

                {/* Exercises */}
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    Exercises
                  </h3>
                  <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto custom-scrollbar">
                    {workout.exercises?.map((ex, idx) => (
                      <div key={idx} className="bg-slate-700/40 rounded-xl p-3 sm:p-4 border border-slate-600/30">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-white text-sm lg:text-base">{ex.name}</h4>
                          {ex.weight && (
                            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-lg">
                              {ex.weight}kg
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300 mb-2">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                            {ex.sets} sets
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            {ex.reps} reps
                          </span>
                        </div>
                        {ex.notes && (
                          <p className="text-xs text-slate-400 italic mt-2 p-2 bg-slate-800/50 rounded-lg">
                            "{ex.notes}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-48 sm:w-64 h-48 sm:h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default GetWorkouts;