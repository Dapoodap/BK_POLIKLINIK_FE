import{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaPhone , FaHome, FaCalendar, FaStethoscope, FaHistory, FaUser,FaUserMd, FaUserInjured, FaHospital, FaPills } from 'react-icons/fa';
import { Nav, Image, Badge } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ava from "../assets/avatar.jpg";
import udinus from "../assets/udinus.png";

const Sidebar = () => {
  const [role, setRole] = useState('');
  const [nama, setnama] = useState('');
  const handleSignOut = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Redirect to '/'
    window.location.href = '/';
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);

    // Mendapatkan informasi dari payload
    setRole(decodedToken.role);
  }, []);
  useEffect(()=>{
    if (role && role==='pasien') {
        const fetcUser = async ()=>{
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
    
        // Mendapatkan informasi dari payload
        setRole(decodedToken.role);
              try {
                const response = await axios.get(`http://127.0.0.1:8000/api/pasien/ById/${decodedToken.sub}`);
                setnama(response.data.data)
                
          
              } catch (error) {
                  alert(error.response.data.error)
                console.error('Error logging in:', error.response.data);
              }
            }
             fetcUser()
    }
    if (role && role==='dokter') {
        const fetcUser = async ()=>{
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
    
        // Mendapatkan informasi dari payload
        setRole(decodedToken.role);
              try {
                const response = await axios.get(`http://127.0.0.1:8000/api/dokter/ById/${decodedToken.sub}`);
                setnama(response.data.data)
                
          
              } catch (error) {
                  alert(error.response.data.error)
                console.error('Error logging in:', error.response.data);
              }
            }
             fetcUser()
    }
    if (role && role==='admin') {
        const fetcUser = async ()=>{
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
    
        // Mendapatkan informasi dari payload
        setRole(decodedToken.role);
              try {
                const response = await axios.get(`http://127.0.0.1:8000/api/admin/ById/${decodedToken.sub}`);
                setnama(response.data.data)
                
          
              } catch (error) {
                  alert(error.response.data.error)
                console.error('Error logging in:', error.response.data);
              }
            }
             fetcUser()
    }
  },[role])


  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#224b8e',
    color: 'white',
    padding: '20px',
    width: '270px'
  };

  const profileSectionStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const profileLogoStyle = {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  };

  const profileInfoStyle = {
    textAlign: 'center',
  };

  const dividerStyle = {
    borderTop: '1px solid #555',
    margin: '10px 0',
  };

  const navLinkStyle = {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    marginBottom: '20px'
  };

  const badgeStyle = {
    marginLeft: 'auto',
  };

  const iconStyle = {
    marginRight: '8px',
  };

  return (
    <div style={sidebarStyle}>
      <div style={profileSectionStyle}>
        <Image
          src={udinus}
          alt="Profile Logo"
          roundedCircle
          style={profileLogoStyle}
        />
        <div style={profileInfoStyle}>
          <p style={{ margin: '0' }}>Poliklinik BK</p>
        </div>
      </div>
      <hr style={dividerStyle} />
      {role === 'dokter' && (
        <>
          <div style={profileSectionStyle}>
            <Image
              src={ava}
              alt="Profile Logo"
              roundedCircle
              style={profileLogoStyle}
            />
            <div style={profileInfoStyle}>
              <p style={{ margin: '0' }}>{nama.nama}</p>
            </div>
          </div>
          <hr style={dividerStyle} />
          <Nav className="flex-column">
          <Nav.Item>
          <Nav.Link as={Link} to="/dashboard/dokter" className="nav-link" eventKey="dashboard" style={navLinkStyle}>
            <FaHome style={iconStyle} />
            Dashboard
            <Badge bg='danger' style={badgeStyle}>Dokter</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/jadwal-periksa" className="nav-link" eventKey="jadwal-periksa" style={navLinkStyle}>
            <FaCalendar style={iconStyle} />
            Jadwal Periksa
            <Badge bg='danger' style={badgeStyle}>Dokter</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/periksa-pasien" className="nav-link" eventKey="memeriksa-pasien" style={navLinkStyle}>
            <FaStethoscope style={iconStyle} />
            Memeriksa Pasien
            <Badge bg='danger' style={badgeStyle}>Dokter</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/riwayat-pasien" className="nav-link" eventKey="riwayat-pasien" style={navLinkStyle}>
            <FaHistory style={iconStyle} />
            Riwayat Pasien
            <Badge bg='danger' style={badgeStyle}>Dokter</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/profil" className="nav-link" eventKey="profil" style={navLinkStyle}>
            <FaUser style={iconStyle} />
            Profil
            <Badge bg='danger' style={badgeStyle}>Dokter</Badge>
          </Nav.Link>
        </Nav.Item>
            {/* Tambahkan menu lainnya sesuai kebutuhan dokter */}
          </Nav>
          <Nav className="flex-column mt-auto"> {/* mt-auto pushes the items to the bottom */}
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="nav-link" style={navLinkStyle}>
                <FaHome style={iconStyle} />
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/contact" className="nav-link" style={navLinkStyle}>
                <FaPhone style={iconStyle} />
                Contact
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as="div" className="nav-link" style={navLinkStyle} onClick={handleSignOut}>
                <FaSignOutAlt style={iconStyle} />
                Sign Out
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </>
      )}
      {role === 'pasien' && (
        <>
         <div style={profileSectionStyle}>
            <Image
              src={ava}
              alt="Profile Logo"
              roundedCircle
              style={profileLogoStyle}
            />
            <div style={profileInfoStyle}>
              <p style={{ margin: '0' }}>{nama.nama}</p>
            </div>
          </div>
          <hr style={dividerStyle} />
        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link as={Link} to="/dashboard/pasien" className="nav-link" eventKey="dashboard" style={navLinkStyle}>
              <FaHome style={iconStyle} />
              Dashboard
              <Badge bg='danger' style={badgeStyle}>Pasien</Badge>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/daftar-poli" className="nav-link" eventKey="jadwal-periksa" style={navLinkStyle}>
              <FaCalendar style={iconStyle} />
              Daftar Poli
              <Badge bg='danger' style={badgeStyle}>Pasien</Badge>
            </Nav.Link>
          </Nav.Item>
          {/* Tambahkan menu lainnya sesuai kebutuhan pasien */}
        </Nav>
        <Nav className="flex-column mt-auto"> {/* mt-auto pushes the items to the bottom */}
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="nav-link" style={navLinkStyle}>
                <FaHome style={iconStyle} />
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/contact" className="nav-link" style={navLinkStyle}>
                <FaPhone style={iconStyle} />
                Contact
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as="div" className="nav-link" style={navLinkStyle} onClick={handleSignOut}>
                <FaSignOutAlt style={iconStyle} />
                Sign Out
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </>
        
      )}
      {role === 'admin' && (
        <>
        <div style={profileSectionStyle}>
            <Image
              src={ava}
              alt="Profile Logo"
              roundedCircle
              style={profileLogoStyle}
            />
            <div style={profileInfoStyle}>
              <p style={{ margin: '0' }}>{nama.name}</p>
            </div>
          </div>
        <Nav className="flex-column">
           <Nav.Item>
            <Nav.Link as={Link} to="/dashboard/admin" className="nav-link" eventKey="dashboard" style={navLinkStyle}>
              <FaHome style={iconStyle} />
              Dashboard
              <Badge bg='danger' style={badgeStyle}>Admin</Badge>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/kelola-dokter" className="nav-link" eventKey="dokter" style={navLinkStyle}>
              <FaUserMd style={iconStyle} />
              Dokter
              <Badge bg='danger' style={badgeStyle}>Admin</Badge>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/kelola-pasien" className="nav-link" eventKey="pasien" style={navLinkStyle}>
              <FaUserInjured style={iconStyle} />
              Pasien
              <Badge bg='danger' style={badgeStyle}>Admin</Badge>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/kelola-poli" className="nav-link" eventKey="poli" style={navLinkStyle}>
              <FaHospital style={iconStyle} />
              Poli
              <Badge bg='danger' style={badgeStyle}>Admin</Badge>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/kelola-obat" className="nav-link" eventKey="obat" style={navLinkStyle}>
              <FaPills style={iconStyle} />
              Obat
              <Badge bg='danger' style={badgeStyle}>Admin</Badge>
            </Nav.Link>
          </Nav.Item>
          
        </Nav>
        <Nav className="flex-column mt-auto"> {/* mt-auto pushes the items to the bottom */}
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="nav-link" style={navLinkStyle}>
                <FaHome style={iconStyle} />
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/contact" className="nav-link" style={navLinkStyle}>
                <FaPhone style={iconStyle} />
                Contact
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as="div" className="nav-link" style={navLinkStyle} onClick={handleSignOut}>
                <FaSignOutAlt style={iconStyle} />
                Sign Out
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </>
        
      )}
    </div>
  );
};

export default Sidebar;
