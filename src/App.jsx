import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import LoginPagePasien from './pages/pasien/LoginPagePasien';
import RegisterPagePasien from './pages/pasien/RegisterPagePasien';
import LoginPageDokter from './pages/dokter/LoginPageDokter';
import DashboardPagePasien from './pages/pasien/DashboardPagePasien';
import PrivateRoutesPasien from './utils/PrivateRoutesPasien';
import PrivateRoutesAdmin from './utils/PrivateRouteAdmin';
import PrivateRoutesDokter from './utils/PrivateRoutesDokter';
import DashboardPageAdmin from './pages/admin/DashboardPageAdmin';
import DashboardPageDokter from './pages/dokter/DashboardPageDokter';
import LoginPageAdmin from './pages/admin/LoginPageAdmin';
import DaftarPoliPasien from './pages/pasien/DaftarPoliPasien';
import KelolaDokter from './pages/admin/KelolaDokter';
import EditDokter from './pages/admin/EditDokter';
import KelolaPasien from './pages/admin/KelolaPasien';
import KelolaPoli from './pages/admin/KelolaPoli';
import KelolaObat from './pages/admin/KelolaObat';
import EditPasien from './pages/admin/EditPasien';
import EditPoli from './pages/admin/EditPoli';
import EditObat from './pages/admin/EditObat';
import JadwalPeriksa from './pages/dokter/JadwalPeriksa';
import PeriksaPasien from './pages/dokter/PeriksaPasien';
import PeriksaPasienForm from './pages/dokter/PeriksaPasienForm';
import EditPeriksa from './pages/dokter/EditPeriksa';
import RiwayatPasien from './pages/dokter/RiwayatPasien';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/pasien/login" element={<LoginPagePasien />} />
      <Route path="/pasien/register" element={<RegisterPagePasien />} />
      <Route path="/dokter/login" element={<LoginPageDokter />} />
      <Route path="/admin/login" element={<LoginPageAdmin/>} />
      
      
      
      <Route element={<PrivateRoutesPasien/>}>
        <Route path="/dashboard/pasien" element={<DashboardPagePasien />} />
        <Route path="/daftar-poli" element={<DaftarPoliPasien/>} />
      </Route>
      <Route element={<PrivateRoutesAdmin/>}>
        <Route path="/dashboard/admin" element={<DashboardPageAdmin/>} />
        <Route path="/kelola-dokter" element={<KelolaDokter/>} />
        <Route path="/edit-dokter" element={<EditDokter/>} />
        <Route path="/kelola-pasien" element={<KelolaPasien/>} />
        <Route path="/edit-pasien" element={<EditPasien/>} />
        <Route path="/kelola-poli" element={<KelolaPoli/>} />
        <Route path="/edit-poli" element={<EditPoli/>} />
        <Route path="/kelola-obat" element={<KelolaObat/>} />
        <Route path="/edit-obat" element={<EditObat/>} />
      </Route>
      <Route element={<PrivateRoutesDokter/>}>
        <Route path="/dashboard/dokter" element={<DashboardPageDokter/>} />
        <Route path="/jadwal-periksa" element={<JadwalPeriksa/>} />
        <Route path="/periksa-pasien" element={<PeriksaPasien/>} />
        <Route path="/periksa-form" element={<PeriksaPasienForm/>} />
        <Route path="/edit-periksa" element={<EditPeriksa/>} />
        <Route path="/riwayat-pasien" element={<RiwayatPasien/>} />
      </Route>
    </Routes>
  );
}

export default App
