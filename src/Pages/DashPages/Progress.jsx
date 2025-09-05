import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2, TrendingUp, Calendar, Scale, Ruler, Target, Sparkles, User, Activity, Zap } from 'lucide-react';

// Zod Schema for validation
const progressSchema = z.object({
  weight: z.number().min(1, 'Weight is required'),
  bodyMeasurements: z.object({
    chest: z.number().min(0).optional(),
    waist: z.number().min(0).optional(),
    hips: z.number().min(0).optional(),
    arms: z.number().min(0).optional(),
    legs: z.number().min(0).optional(),
  }),
  performanceMetrics: z.object({
    runTime: z.number().min(0).optional(),
    liftingMax: z.number().min(0).optional(),
    other: z.string().optional(),
  }),
  date: z.string().optional(),
});

const Progress = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(progressSchema),
    defaultValues: {
      weight: '',
      bodyMeasurements: { chest: '', waist: '', hips: '', arms: '', legs: '' },
      performanceMetrics: { runTime: '', liftingMax: '', other: '' },
      date: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `${API_URL}/api/progress/add`,
        data,
        { withCredentials: true }
      );

      toast.success('🎉 Progress added successfully!', { theme: 'dark', autoClose: 3000 });
      reset();
    } catch (error) {
      console.error('Error adding progress:', error);
      let msg = 'Failed to add progress';
      if (error.response) msg = error.response.data?.message || msg;
      toast.error(`❌ ${msg}`, { theme: 'dark', autoClose: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-2 sm:p-4 lg:p-6">
      <ToastContainer />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl mb-4 sm:mb-6 shadow-2xl shadow-purple-500/25 animate-pulse">
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 sm:mb-4">
            Progress Tracker Pro
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg font-medium max-w-2xl mx-auto">
            Track your fitness journey with precision. Monitor weight, measurements, and performance metrics.
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs sm:text-sm text-gray-500">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Your transformation starts here</span>
          </div>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-slate-900/50 space-y-6 sm:space-y-8"
        >
          {/* Weight Section */}
          <div className="group">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-0.5 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Body Weight</h2>
                </div>
                
                <div className="relative">
                  <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2 sm:mb-3">
                    Current Weight (kg) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('weight', { valueAsNumber: true })}
                    className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 text-sm sm:text-base focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="Enter your current weight"
                    disabled={isSubmitting}
                  />
                  {errors.weight && (
                    <div className="mt-2 p-2 bg-red-900/30 border border-red-500/50 rounded-lg">
                      <p className="text-red-400 text-xs sm:text-sm">⚠️ {errors.weight.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Body Measurements Section */}
          <div className="group">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-0.5 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Body Measurements</h2>
                  <span className="text-xs sm:text-sm text-gray-400 ml-auto">(Optional)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
                  {[
                    { key: 'chest', label: 'Chest', icon: '💪', color: 'from-red-400 to-pink-500' },
                    { key: 'waist', label: 'Waist', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
                    { key: 'hips', label: 'Hips', icon: '🎯', color: 'from-purple-400 to-indigo-500' },
                    { key: 'arms', label: 'Arms', icon: '💪', color: 'from-green-400 to-emerald-500' },
                    { key: 'legs', label: 'Legs', icon: '🦵', color: 'from-blue-400 to-cyan-500' }
                  ].map(({ key, label, icon, color }) => (
                    <div key={key} className="group/item">
                      <div className={`bg-gradient-to-br ${color} p-0.5 rounded-xl hover:shadow-lg transition-all duration-300 group-hover/item:scale-105`}>
                        <div className="bg-slate-800/80 rounded-xl p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg">{icon}</span>
                            <span className="text-xs text-gray-500">cm</span>
                          </div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                            {label}
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            {...register(`bodyMeasurements.${key}`, { valueAsNumber: true })}
                            className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-2 sm:px-3 py-2 text-white placeholder-gray-400 text-xs sm:text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all duration-200"
                            placeholder="0.0"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics Section */}
          <div className="group">
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-0.5 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Performance Metrics</h2>
                  <span className="text-xs sm:text-sm text-gray-400 ml-auto">(Optional)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="group/metric">
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 p-0.5 rounded-xl hover:shadow-lg transition-all duration-300 group-hover/metric:scale-105">
                      <div className="bg-slate-800/80 rounded-xl p-4 sm:p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <Activity className="w-5 h-5 text-orange-400" />
                          <span className="text-sm sm:text-base font-medium text-white">Cardio</span>
                        </div>
                        <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                          Run Time (minutes)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...register('performanceMetrics.runTime', { valueAsNumber: true })}
                          className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-200"
                          placeholder="0.0"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="group/metric">
                    <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-0.5 rounded-xl hover:shadow-lg transition-all duration-300 group-hover/metric:scale-105">
                      <div className="bg-slate-800/80 rounded-xl p-4 sm:p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <Zap className="w-5 h-5 text-blue-400" />
                          <span className="text-sm sm:text-base font-medium text-white">Strength</span>
                        </div>
                        <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                          Max Lift (kg)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          {...register('performanceMetrics.liftingMax', { valueAsNumber: true })}
                          className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-200"
                          placeholder="0.0"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="group/metric sm:col-span-2 lg:col-span-1">
                    <div className="bg-gradient-to-br from-green-400 to-teal-500 p-0.5 rounded-xl hover:shadow-lg transition-all duration-300 group-hover/metric:scale-105">
                      <div className="bg-slate-800/80 rounded-xl p-4 sm:p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <User className="w-5 h-5 text-green-400" />
                          <span className="text-sm sm:text-base font-medium text-white">Notes</span>
                        </div>
                        <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                          Additional Notes
                        </label>
                        <input
                          type="text"
                          {...register('performanceMetrics.other')}
                          className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-200"
                          placeholder="Any additional notes..."
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Date Section */}
          <div className="group">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-0.5 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Date</h2>
                  <span className="text-xs sm:text-sm text-gray-400 ml-auto">(Optional - defaults to today)</span>
                </div>
                
                <input
                  type="date"
                  {...register('date')}
                  className="w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white text-sm sm:text-base focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-lg text-sm sm:text-base lg:text-lg relative overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex justify-center items-center gap-2 sm:gap-3">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>Logging Progress...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Log My Progress</span>
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Footer Info */}
          <div className="text-center pt-4">
            <p className="text-xs sm:text-sm text-gray-500">
              <span className="text-red-400">*</span> Required fields • Your progress is automatically saved and tracked over time
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Progress;