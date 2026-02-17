import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeLayout from "./layout/HomeLayout"
import LandingPage from "./pages/LandingPage"
import ProblemsPage from "./pages/ProblemsPage"
import ProblemDetailPage from "./components/ProblemDetailPage"
import AuthPage from "./pages/AuthPage"

function App() {
  

  return (
    <Router>
      <div className="relative min-h-screen bg-black text-white selection:bg-indigo-500/30">
        <Routes>

          <Route element={<HomeLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/problems" element={<ProblemsPage />} />
              <Route path="/problem/:id" element={<ProblemDetailPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/signin" element={<AuthPage mode="signin" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
