import { useState, useEffect } from "react";
import { Card, Form, Button, Table, Alert } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const KelolaDokter = () => {
  const [namaDokter, setNamaDokter] = useState("");
  const [username, setUsername] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [idPoli, setIdPoli] = useState("");
  const [password, setPassword] = useState("");
  const [poliList, setPoliList] = useState([]);
  const [daftarDokter, setDaftarDokter] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const nav = useNavigate()

  const handleEditDoctor = (data) =>{
    nav('/edit-dokter',{ state: { myProp: data } })
  }
  const handleDeleteDoctor = async (id) => {
    try {
      // Kirim permintaan DELETE ke endpoint yang sesuai
      await axios.delete(`http://127.0.0.1:8000/api/dokter/DeleteDokter/${id}`);
  
      alert("sukses hapus data")
      // Handle success, misalnya dengan memperbarui daftar dokter setelah penghapusan
      const response = await axios.get("http://127.0.0.1:8000/api/dokter/getAll");
      setDaftarDokter(response.data.data);
  
      // Tampilkan pesan sukses atau lakukan tindakan lain yang sesuai
  
    } catch (error) {
      // Handle error, tampilkan pesan kesalahan atau lakukan tindakan lain yang sesuai
      console.error(`Error deleting doctor with ID ${id}:`, error.response.data);
    }
  };

  useEffect(() => {
    const fetchPoliList = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/poli/getAll"
        );
        setPoliList(response.data.data);
      } catch (error) {
        console.error("Error fetching poli list:", error.response.data);
      }
    };

    fetchPoliList();

    const fetchDaftarDokter = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/dokter/getAll"
        );
        setDaftarDokter(response.data.data);
      } catch (error) {
        console.error("Error fetching daftar dokter:", error.response.data);
      }
    };

    fetchDaftarDokter();
  }, []);

  const handleTambahDokter = async (e) => {
    e.preventDefault();

    // Validation (you can add more validation as needed)
    if (!namaDokter || !idPoli || !username || !alamat || !noHp || !password) {
      alert("Semua field harus diisi.");
      return;
    }

    const postData = {
      nama: namaDokter,
      id_poli: idPoli,
      username: username,
      alamat: alamat,
      no_hp: noHp,
      role: "dokter",
      password: password,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/dokter/PostDokter", postData);

      // Handle success, you can update the UI or show a success message
      console.log("Doctor added successfully");

      // Reset the form fields
      setNamaDokter("");
      setIdPoli("");
      setUsername("");
      setAlamat("");
      setNoHp("");
      setPassword("");
      alert("sukses tambah")

      // Fetch the updated list of doctors
      const response = await axios.get("http://127.0.0.1:8000/api/dokter/getAll");
      setDaftarDokter(response.data.data);

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
              <h3>Tambah Dokter</h3>
            </Card.Header>
            <Card.Body>
              {showAlert && (
                <Alert
                  variant="success"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  Doctor added successfully!
                </Alert>
              )}
              <Form onSubmit={handleTambahDokter}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Dokter</Form.Label>
                  <Form.Control
                    placeholder="Dr. Jhon Doe Sp.A"
                    type="text"
                    value={namaDokter}
                    onChange={(e) => setNamaDokter(e.target.value)}
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
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Poli</Form.Label>
                  <Form.Select
                    value={idPoli}
                    onChange={(e) => setIdPoli(e.target.value)}
                  >
                    <option value="">Pilih Poli</option>
                    {poliList.map((poli) => (
                      <option key={poli.id} value={poli.id}>
                        {poli.nama_poli}
                      </option>
                    ))}
                  </Form.Select>
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
                  Tambah Dokter
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {/* Table to display the list of doctors */}
          <Card>
            <Card.Header><h3>Daftar Dokter</h3></Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Dokter</th>
                    <th>Username</th>
                    <th>Alamat</th>
                    <th>No. HP</th>
                    <th>Poli</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarDokter.map((dokter, index) => (
                    <tr key={dokter.id}>
                      <td>{index + 1}</td>
                      <td>{dokter.nama}</td>
                      <td>{dokter.username}</td>
                      <td>{dokter.alamat}</td>
                      <td>{dokter.no_hp}</td>
                      <td>{dokter.poli.nama_poli}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleEditDoctor(dokter)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteDoctor(dokter.id)}
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

export default KelolaDokter;
