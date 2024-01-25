import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button, Table, Row, Col, Alert, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const DaftarPoliPasien = () => {
  const [data, setData] = useState();
  const [poli, setPoli] = useState([]);
  const [jadwal, setJadwal] = useState([]);
  const [riwayat, setRiwayat] = useState([]);
  const [selectedPoli, setSelectedPoli] = useState('');
  const [selectedJadwal, setSelectedJadwal] = useState('');
  const [keluhan, setKeluhan] = useState('');
  const [userId, setUserId] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function formatTime(inputTime) {
    // Parse the input time string
    const [hours, minutes] = inputTime.split(':');

    // Format the time as HH:mm
    const formattedTime = `${hours.padStart(2, '0')}.${minutes} WIB`;

    return formattedTime;
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/pasien/ById/${decodedToken.sub}`
        );
        setData(response.data.data);
        setUserId(decodedToken.sub);
      } catch (error) {
        alert(error.response.data.error);
        console.error("Error logging in:", error.response.data);
      }
    };

    const fetchPoli = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/poli/getAll`
        );
        setPoli(response.data.data);
      } catch (error) {
        alert(error.response.data.error);
        console.error("Error fetching poli:", error.response.data);
      }
    };
    const fetchRiwayat = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/daftar/pasien/${decodedToken.sub}`
        );
        setRiwayat(response.data.data);
      } catch (error) {
        console.error("Error fetching poli:", error.response.data);
      }
    };

    fetchUser();
    fetchPoli();
    fetchRiwayat();
  }, []);

  useEffect(() => {
    const fetchJadwalByPoli = async () => {
      if (selectedPoli) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/jadwal/ByPoliId/${selectedPoli}`
          );
          setJadwal(response.data.data);
        } catch (error) {
          alert(error.response.data.error);
          console.error("Error fetching jadwal by poli:", error.response.data);
        }
      }
    };

    fetchJadwalByPoli();
  }, [selectedPoli]);

  const handleDaftarSubmit = async (e) => {
    e.preventDefault();

    if (!selectedJadwal) {
      alert("Please select a schedule.");
      return;
    }

    const postData = {
      id_pasien: userId,
      id_jadwal: selectedJadwal,
      keluhan: keluhan,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/daftar/PostJadwal", postData);

      // Handle success, you can update the UI or redirect as needed
      console.log("Form submitted successfully");

      // Reset the form
      setShowAlert(true);
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/daftar/pasien/${decodedToken.sub}`
      );
      setRiwayat(response.data.data);
      const idDaftarPoli = response.data.data[0].id;

      // Perform POST to /periksa/PostPeriksa
      const periksaData = {
        id_daftar_poli: idDaftarPoli,
        tanggal: new Date().toISOString().slice(0, 10), // example: today's date
      };

      await axios.post("http://127.0.0.1:8000/api/periksa/PostPeriksa", periksaData);
    } catch (error) {
      alert(error.response.data.error);
      console.error("Error submitting form:", error.response.data);
    }
  };

  const openModal = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <Sidebar />
      
      <div className="dashboard-content" style={{ flexGrow: "1", padding: "30px" }}>
        <Row>
          <h1>Daftar Poli</h1>
          {/* Card kiri untuk formulir daftar poli */}
          <Col md={4}>
            <Card className="mb-3" style={{ height: "fit-content" }}>
              <Card.Header style={{ backgroundColor: "#007BFF", color: "white" }}>
                Formulir Daftar Poli
              </Card.Header>
              <Card.Body>
                {showAlert && (
                  <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Form submitted successfully!
                  </Alert>
                )}
                <Form onSubmit={handleDaftarSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nomor Rekam Medis (No. RM)</Form.Label>
                    <Form.Control type="text" disabled value={data ? data.no_rm : ''} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Pilih Poli</Form.Label>
                    <Form.Select onChange={(e) => setSelectedPoli(e.target.value)}>
                      <option value="">Pilih Poli</option>
                      {poli.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama_poli}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Pilih Jadwal</Form.Label>
                    <Form.Select onChange={(e) => setSelectedJadwal(e.target.value)}>
                      <option value="">Pilih Jadwal</option>
                      {jadwal.map((item) => (
                        item.status === 'Y' && (
                          <option key={item.id} value={item.id}>
                            {item.dokter.nama} | {item.hari}, {item.jam_mulai} - {item.jam_selesai}
                          </option>
                        )
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Keluhan</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={keluhan}
                      onChange={(e) => setKeluhan(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Daftar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Card kanan untuk tabel */}
          <Col md={8}>
            <Card style={{ height: "fit-content" }}>
              <Card.Header style={{ backgroundColor: "#28A745", color: "white" }}>
                Daftar Poli
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Poli</th>
                      <th>Dokter</th>
                      <th>Hari</th>
                      <th>Mulai</th>
                      <th>Selesai</th>
                      <th>Antrian</th>
                      <th>Aksi</th>
                      {/* Add other column headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {riwayat ? riwayat.map((item) => (
                      <>
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.jadwal_periksa.dokter.poli.nama_poli}</td>
                          <td>{item.jadwal_periksa.dokter.nama}</td>
                          <td>{item.jadwal_periksa.hari}</td>
                          <td>{formatTime(item.jadwal_periksa.jam_mulai)}</td>
                          <td>{formatTime(item.jadwal_periksa.jam_selesai)}</td>
                          <td>{item.no_antrian}</td>
                          <td>
                            <Button variant="success" onClick={() => openModal(item)}>
                              Detail
                            </Button>
                          </td>
                        </tr>
                      </>
                    )) : ''}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Modal for displaying details */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <div>
              <p>ID: {selectedRow.id}</p>
              <p>Poli: {selectedRow.jadwal_periksa.dokter.poli.nama_poli}</p>
              <p>Dokter: {selectedRow.jadwal_periksa.dokter.nama}</p>
              <p>Hari: {selectedRow.jadwal_periksa.hari}</p>
              <p>Mulai: {formatTime(selectedRow.jadwal_periksa.jam_mulai)}</p>
              <p>Selesai: {formatTime(selectedRow.jadwal_periksa.jam_selesai)}</p>
              <p>Antrian: {selectedRow.no_antrian}</p>
              {/* Add other details as needed */}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DaftarPoliPasien;
