import { useState, useEffect } from "react";
import { Card, Form, Button, Table, Alert } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const KelolaPasien = () => {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_hp, setno_hp] = useState("");
  const [password, setPassword] = useState("");
  const [no_ktp, setno_ktp] = useState("");
  const [no_rm, setno_rm] = useState("");
  const [daftarPasien, setDaftarPasien] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const nav = useNavigate()

  const handleEditPasien = (data) =>{
    nav('/edit-pasien',{ state: { myProp: data } })
  }
  const handleDeletePasien = async (id) => {
    try {
      // Kirim permintaan DELETE ke endpoint yang sesuai
      await axios.delete(`http://127.0.0.1:8000/api/pasien/DeletePasien/${id}`);
  
      alert("sukses hapus data")
    
      const response = await axios.get("http://127.0.0.1:8000/api/pasien/getAll");
      setDaftarPasien(response.data.data);
      const today = new Date();
      const yearMonth = today.getFullYear() * 100 + today.getMonth() + 1; // Mendapatkan tahun dan bulan dalam format YYYYMM
      const jumlahPasien =response.data.data.length; // Gantilah dengan nilai yang sesuai
      setno_rm(`${yearMonth}-${String(jumlahPasien + 1).padStart(3, '0')}`);

  
      // Tampilkan pesan sukses atau lakukan tindakan lain yang sesuai
  
    } catch (error) {
      // Handle error, tampilkan pesan kesalahan atau lakukan tindakan lain yang sesuai
      console.error(`Error deleting doctor with ID ${id}:`, error.response.data);
    }
  };
  useEffect(() => {
    const fetchAllPasien = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/pasien/getAll"
        );
        setDaftarPasien(response.data.data);
        const today = new Date();
        const yearMonth = today.getFullYear() * 100 + today.getMonth() + 1; // Mendapatkan tahun dan bulan dalam format YYYYMM
        const jumlahPasien =response.data.data.length; // Gantilah dengan nilai yang sesuai
        setno_rm(`${yearMonth}-${String(jumlahPasien + 1).padStart(3, '0')}`);
      } catch (error) {
        console.error("Error fetching poli list:", error.response.data);
      }
    };

    fetchAllPasien();
  }, []);

  const handleTambahPasien = async (e) => {
    e.preventDefault();

    if (!nama || !username || !alamat || !no_hp || !no_ktp || !password) {
      alert("Semua field harus diisi.");
      return;
    }

    const postData = {
      nama: nama,
      username: username,
      alamat: alamat,
      no_hp: no_hp,
      no_ktp: no_ktp,
      role: "pasien",
      password: password,
    };

    // console.log(postData);
    try {
      await axios.post("http://127.0.0.1:8000/api/pasien/PostPasien", postData);
      // Handle success, you can update the UI or show a success message
      console.log("Pasien added successfully");

      // Reset the form fields
      setNama("");
      setUsername("");
      setAlamat("");
      setno_hp("");
      setno_ktp("");
      setPassword("");

      // Fetch the updated list of doctors
      const response = await axios.get("http://127.0.0.1:8000/api/pasien/getAll");
      setDaftarPasien(response.data.data);
      const today = new Date();
      const yearMonth = today.getFullYear() * 100 + today.getMonth() + 1; // Mendapatkan tahun dan bulan dalam format YYYYMM
      const jumlahPasien =response.data.data.length; // Gantilah dengan nilai yang sesuai
      setno_rm(`${yearMonth}-${String(jumlahPasien + 1).padStart(3, '0')}`);

      // Show a success alert
      setShowAlert(true);
    } catch (error) {
      alert(error.response.data.error);
      console.error("Error adding doctor:", error.response.data);
    }
  };

  return (
    <>
      <div className="dashboard-container" style={{ display: "flex" }}>
        {localStorage.getItem("token") ? <Sidebar /> : <></>}
        <div
          className="dashboard-content"
          style={{ flexGrow: "1", padding: "20px" }}
        >
          {/* Form to add a doctor */}
          <Card className="mb-3">
            <Card.Header style={{ backgroundColor: "#007BFF", color: "white" }}>
              <h3>Tambah Pasien</h3>
            </Card.Header>
            <Card.Body>
              {showAlert && (
                <Alert
                  variant="success"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  Pasien added successfully!
                </Alert>
              )}
              <Form onSubmit={handleTambahPasien}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Pasien</Form.Label>
                  <Form.Control
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    type="text"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>No. HP</Form.Label>
                  <Form.Control
                    type="number"
                    value={no_hp}
                    onChange={(e) => setno_hp(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>No. KTP</Form.Label>
                  <Form.Control
                    type="number"
                    value={no_ktp}
                    onChange={(e) => setno_ktp(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>No. RM</Form.Label>
                  <Form.Control
                    type="text"
                    value={no_rm}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Tambah Pasien
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {/* Table to display the list of doctors */}
          <Card>
            <Card.Header><h3>Daftar Pasien</h3></Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>No. KTP</th>
                    <th>No. HP</th>
                    <th>No. RM</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarPasien.map((pasien, index) => (
                    <tr key={pasien.id}>
                      <td>{index + 1}</td>
                      <td>{pasien.nama}</td>
                      <td>{pasien.alamat}</td>
                      <td>{pasien.no_ktp}</td>
                      <td>{pasien.no_hp}</td>
                      <td>{pasien.no_rm}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleEditPasien(pasien)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => handleDeletePasien(pasien.id)}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default KelolaPasien