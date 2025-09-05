import React, { useState } from "react";
import { Calculator, Scale, Ruler, TrendingUp, Heart, AlertTriangle } from "lucide-react";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    if (!weight || !height || weight <= 0 || height <= 0) {
      setBmi(null);
      setStatus("Please enter valid weight and height.");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setStatus("Underweight");
    else if (bmiValue >= 18.5 && bmiValue < 24.9) setStatus("Normal weight");
    else if (bmiValue >= 25 && bmiValue < 29.9) setStatus("Overweight");
    else setStatus("Obese");
  };

  const getBMIColor = () => {
    if (!bmi) return "";
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return "text-blue-400";
    if (bmiNum < 24.9) return "text-green-400";
    if (bmiNum < 29.9) return "text-yellow-400";
    return "text-red-400";
  };

  const getBMIBgColor = () => {
    if (!bmi) return "";
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return "bg-blue-500/20 border-blue-500/30";
    if (bmiNum < 24.9) return "bg-green-500/20 border-green-500/30";
    if (bmiNum < 29.9) return "bg-yellow-500/20 border-yellow-500/30";
    return "bg-red-500/20 border-red-500/30";
  };

  const getStatusIcon = () => {
    if (!bmi) return null;
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return <TrendingUp className="w-5 h-5 text-blue-400" />;
    if (bmiNum < 24.9) return <Heart className="w-5 h-5 text-green-400" />;
    if (bmiNum < 29.9) return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    return <AlertTriangle className="w-5 h-5 text-red-400" />;
  };

  const getBMIDescription = () => {
    if (!bmi) return "";
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return "Consider consulting with a healthcare provider about healthy weight gain.";
    if (bmiNum < 24.9) return "Great! You're in the healthy weight range. Keep up the good work!";
    if (bmiNum < 29.9) return "Consider incorporating regular exercise and a balanced diet.";
    return "It's recommended to consult with a healthcare provider about weight management.";
  };

  const clearForm = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setStatus("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 flex items-center justify-center">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            BMI Calculator
          </h2>
          <p className="text-gray-400 text-sm mt-2">Calculate your Body Mass Index</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4 text-green-400" />
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your weight in kilograms"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-blue-400" />
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your height in centimeters"
              min="0"
              step="0.1"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={calculateBMI}
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            Calculate BMI
          </button>
          <button
            onClick={clearForm}
            className="px-4 py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl transition-all duration-200 border border-gray-600 hover:border-gray-500"
          >
            Clear
          </button>
        </div>

        {/* BMI Result */}
        {bmi && (
          <div className={`p-6 rounded-xl border ${getBMIBgColor()} backdrop-blur-sm transition-all duration-300`}>
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                {getStatusIcon()}
                <h3 className="text-lg font-semibold text-white">Your BMI Result</h3>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-4xl font-bold ${getBMIColor()}`}>{bmi}</span>
                <span className="text-gray-400 text-sm">kg/m²</span>
              </div>
            </div>

            <div className="text-center mb-4">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getBMIColor()} bg-current bg-opacity-10`}>
                {status}
              </span>
            </div>

            <div className="text-center">
              <p className="text-gray-300 text-sm leading-relaxed">
                {getBMIDescription()}
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {!bmi && status && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <p className="text-sm font-medium">{status}</p>
            </div>
          </div>
        )}

        {/* BMI Scale Reference */}
        <div className="mt-6 p-4 bg-gray-700/30 rounded-xl">
          <h4 className="text-sm font-medium text-gray-300 mb-3 text-center">BMI Scale Reference</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-blue-400">Underweight</span>
              <span className="text-gray-400">Below 18.5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-400">Normal weight</span>
              <span className="text-gray-400">18.5 - 24.9</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-yellow-400">Overweight</span>
              <span className="text-gray-400">25.0 - 29.9</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-400">Obese</span>
              <span className="text-gray-400">30.0 and above</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            * This calculator provides estimates only. Consult healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;