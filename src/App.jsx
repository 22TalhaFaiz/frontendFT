
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Footer from './Components/Footer'
import Layout from './Components/Layout'
import Dashboard from './Pages/Dashboard'
import ProtectedRoute from './Components/ProtectedRoute'
import NotFound from './Pages/NotFound'
import Workout from './Pages/DashPages/Workout'
import DashboardLayout from './Pages/DashboardLayout'
import Nutrition from './Pages/DashPages/Nutrition'
import BMICalc from './Pages/DashPages/BMICalc'
import Progress from './Pages/DashPages/Progress'
import Profile from './Pages/DashPages/Profile'
import Settings from './Pages/DashPages/Settings'
import Contact from './Components/Contact'
import WorkoutGet from './Pages/DashPages/WorkoutGet'
import NutritionGet from './Pages/DashPages/NutritionGet'
import About from './Pages/About'
import ForgotPasswordForm from './Pages/Fp'


function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/ab" element={<Layout><About /></Layout>} />
          <Route path="/l" element={<Layout><Login /></Layout>} />
          <Route path="/r" element={<Layout><Register /></Layout>} />
          <Route path="/C" element={<Layout><Contact /></Layout>} />
          <Route path="/fp" element={<ForgotPasswordForm />} />



           <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />                {/* /dashboard */}
          <Route path="workout" element={<Workout />} /> 
          <Route path="wget" element={<WorkoutGet />} />                                                     {/* /dashboard/workout */}
          <Route path="nutrition" element={<Nutrition />} />
          <Route path="nget" element={<NutritionGet />} />
          <Route path="bmi" element={<BMICalc />} />
          <Route path="progress" element={<Progress />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>


          <Route path="*" element={<NotFound />} />
        </Routes>


      </BrowserRouter>

    </>
  )
}

export default App
