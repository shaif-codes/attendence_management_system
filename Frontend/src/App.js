import './App.css';
import AdminDashBoard from './Components/Admin/AdminDashboard';
import Login from './Components/Common/Login';
// import Home from './Components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentDashboard from './Components/Student/StudentDashboard';
import TeacherDashboard from './Components/Teacher/TeacherDashboard';
import FactsSection from './Components/Admin/FactsSection';
import GraphsSection from './Components/Admin/GraphSection';
import ClassesPage from './Components/Admin/ClassesPage';
import StudentPage from './Components/Admin/Studentpage';
import TeacherPage from './Components/Admin/TeacherPage';
// import Header from './Components/Navigation/Header';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/admin" element={<AdminDashBoard />} />
          <Route path="/student" element={<StudentDashboard /> } />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/facts" element={<FactsSection />} />
          <Route path="/graph" element={<GraphsSection />} />
          <Route path="/adminClass" element={<ClassesPage />} />
          <Route path="/adminStudent" element={<StudentPage />} />
          <Route path="/adminTeacher" element={<TeacherPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
