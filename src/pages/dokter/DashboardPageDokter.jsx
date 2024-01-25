import Sidebar from "../../components/Sidebar"

function DashboardPageDokter() {
  return (
    <div className="dashboard-container" style={{ display:'flex' }}>
    {localStorage.getItem('token')?<Sidebar />:<></>}
    <div className="dashboard-content" style={{ flexGrow:'1',padding:'20px' }}>
      {/* Konten halaman DashboardPasien */}
      <h1>Welcome to Dokter Dashboard!</h1>
      {/* Tambahkan konten sesuai kebutuhan Anda */}
    </div>
  </div>
  )
}

export default DashboardPageDokter