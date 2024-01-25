import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function PrivateRoutesDokter() {
    const nav = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Redirect to the home page if there is no token
        nav('/');
        return;
      }
  
      try {
        // Mendekode token
        const decodedToken = jwtDecode(token);
  
        // Mendapatkan informasi dari payload
       
        const userRole = decodedToken.role; // Contoh klaim tambahan 'role'
        const expirationTime = decodedToken.exp * 1000;  // Waktu kedaluwarsa dalam milidetik
  
  
        // Pemeriksaan apakah token sudah kedaluwarsa
        const currentTime = new Date().getTime();
        if (currentTime < expirationTime) {
          // Token valid dan belum kedaluwarsa
          // Cek rolenya
          if (userRole === 'dokter') {
            // Biarkan pengguna melanjutkan ke Outlet
            return;
          } else {
            // Redirect ke halaman yang sesuai untuk peran selain pasien
            nav('/');
          }
        } else {
          // Token sudah kedaluwarsa
          console.error('Token has expired');
          nav('/');
        }
      } catch (error) {
        // Token tidak valid atau terjadi kesalahan lain
        console.error('Invalid token:', error.message);
        nav('/');
      }
    }, [nav]);
  
    return <Outlet />;
  }

export default PrivateRoutesDokter