
import NavigationBar from "../../components/NavigationBar"
import Sidebar from "../../components/Sidebar"


function DashboardPagePasien() {
  
  return (
    <div className="dashboard-container" style={{ display:'flex' }}>
    {localStorage.getItem('token')?<Sidebar />:<></>}
    <div className="dashboard-content" style={{ flexGrow:'1',padding:'10px' }}>
      {/* Konten halaman DashboardPasien */}
      <NavigationBar/>
      <h1>Welcome to Pasien Dashboard!</h1>
      {/* Tambahkan konten sesuai kebutuhan Anda */}
    </div>
  </div>
  )
}

export default DashboardPagePasien