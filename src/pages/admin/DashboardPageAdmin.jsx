import Sidebar from "../../components/Sidebar"
import WidgetsDropdown from "../../components/WidgetsDropdown"


function DashboardPageAdmin() {
  
  return (
    <div className="dashboard-container" style={{ display:'flex' }}>
    {localStorage.getItem('token')?<Sidebar />:<></>}
    <div className="dashboard-content" style={{ flexGrow:'1',padding:'10px' }}>
      <h1 className="my-5">Welcome to Admin Dashboard!</h1>
      <WidgetsDropdown/>
    </div>
  </div>
  )
}

export default DashboardPageAdmin