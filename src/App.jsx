import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import LoginPagePasien from './pages/pasien/LoginPagePasien';
import RegisterPagePasien from './pages/pasien/RegisterPagePasien';
import LoginPageDokter from './pages/dokter/LoginPageDokter';
import DashboardPagePasien from './pages/pasien/DashboardPagePasien';
import PrivateRoutesPasien from './utils/PrivateRoutesPasien';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/pasien/login" element={<LoginPagePasien />} />
      <Route path="/pasien/register" element={<RegisterPagePasien />} />
      <Route path="/dokter/login" element={<LoginPageDokter />} />
      <Route element={<PrivateRoutesPasien/>}>
        <Route path="/dashboard/pasien" element={<DashboardPagePasien />} />
      </Route>
    </Routes>
  );
}

export default App
