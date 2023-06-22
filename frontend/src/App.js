import './App.css';
import Navbar from './components/Navbar';
import RegisterUser from './pages/RegisterUser';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import EditUser from './pages/EditUser';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/add" element={<RegisterUser />} />
        <Route path="/user/edit/:id" element={<EditUser />} />
        <Route path="/user/detail/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
}

export default App;
