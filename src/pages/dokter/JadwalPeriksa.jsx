import { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Form, Badge } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { jwtDecode } from "jwt-decode";

const JadwalPeriksa = () => {
  const [daftarJadwal, setDaftarJadwal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idDokter, setIdDokter] = useState("");
  const [hari, setHari] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [status, setStatus] = useState("Y"); // Default value is "Y" (Aktif)
  const [editData, setEditData] = useState(null);

  const handleEditJadwal = (data) => {
    setEditData(data);
    setHari(data.hari);
    setJamMulai(data.jam_mulai);
    setJamSelesai(data.jam_selesai);
    setStatus(data.status);
    setShowModal(true);
  };

  const handleDeleteJadwal = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/jadwal/DeleteJadwal/${id}`);

      alert("Sukses hapus data");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/jadwal/ByDokterId/${idDokter}`
      );
      setDaftarJadwal(response.data.data);
    } catch (error) {
      console.error(`Error deleting schedule with ID ${id}:`, error.response.data);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    resetFormFields()
    setShowModal(false);
  };

  const handleTambahJadwal = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    const formDataWithDate = {
      id_dokter: idDokter,
      hari: hari,
      jam_mulai: jamMulai,
      jam_selesai: jamSelesai,
      tanggal: currentDate,
      status: status,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/jadwal/PostJadwal", formDataWithDate);
      handleCloseModal();

      const response = await axios.get(
        `http://127.0.0.1:8000/api/jadwal/ByDokterId/${idDokter}`
      );
      setDaftarJadwal(response.data.data);

      alert("Jadwal berhasil ditambahkan");
      resetFormFields()
      setShowModal(false);
    } catch (error) {
      alert(error.response.data.error)
      console.error("Error adding schedule:", error.response.data);
    }
  };
  const resetFormFields = () => {
    setHari("");
    setJamMulai("");
    setJamSelesai("");
    setStatus("Y"); // Reset status to default value
  };
  const handleEditJadwalSubmit = async (e) => {
    const currentDate = new Date().toISOString().split("T")[0];
    e.preventDefault();

    const updatedJadwal = {
      id: editData.id, // ID jadwal yang akan diubah
      id_dokter: idDokter,
      hari: hari,
      jam_mulai: jamMulai,
      jam_selesai: jamSelesai,
      tanggal: currentDate,
      status: status,
    };
    try {
      await axios.put(`http://127.0.0.1:8000/api/jadwal/UpdateJadwal/${editData.id}`, updatedJadwal);
      handleCloseModal();

      const response = await axios.get(`http://127.0.0.1:8000/api/jadwal/ByDokterId/${idDokter}`);
      setDaftarJadwal(response.data.data);

      alert("Jadwal berhasil diupdate");
      resetFormFields()
      setEditData(null); // Reset data edit setelah berhasil
    } catch (error) {
      alert(error.response.data.error)
      console.error("Error updating schedule:", error.response.data);
    }
  };

  useEffect(() => {
    const fetchAllJadwalByMe = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      setIdDokter(decodedToken.sub)
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/jadwal/ByDokterId/${decodedToken.sub}`
        );
        setDaftarJadwal(response.data.data);
      } catch (error) {
        console.error("Error fetching schedule list:", error.response.data);
      }
    };

    fetchAllJadwalByMe();
  }, []);

  useEffect(() => {
    const fetchAllJadwalByMe = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/jadwal/ByDokterId/${decodedToken.sub}`
        );
        setDaftarJadwal(response.data.data);
      } catch (error) {
        console.error("Error fetching schedule list:", error.response.data);
      }
    };

    fetchAllJadwalByMe();
  }, []);

  return (
    <>
      <div className="dashboard-container" style={{ display: "flex" }}>
        {localStorage.getItem("token") ? <Sidebar /> : <></>}
        <div
          className="dashboard-content"
          style={{ flexGrow: "1", padding: "20px" }}
        >
          <Card>
            <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Daftar jadwal Dokter</h3>
              <Button
                variant="info"
                onClick={handleShowModal}
              >
                + Tambah Jadwal
              </Button>{" "}
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Dokter</th>
                    <th>Hari</th>
                    <th>Jam Mulai</th>
                    <th>Jam Selesai</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarJadwal.map((jadwal, index) => (
                    <tr key={jadwal.id}>
                      <td>{index + 1}</td>
                      <td>{jadwal.dokter.nama}</td>
                      <td>{jadwal.hari}</td>
                      <td>{jadwal.jam_mulai}</td>
                      <td>{jadwal.jam_selesai}</td>
                      <td>
                        {jadwal.status === 'Y' ?
                          <Badge bg="warning">Aktif</Badge> :
                          <Badge bg="danger">Non - Aktif</Badge>
                        }
                      </td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleEditJadwal(jadwal)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteJadwal(jadwal.id)}
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit Jadwal" : "Tambah Jadwal"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editData ? handleEditJadwalSubmit : handleTambahJadwal}>
            <Form.Group className="mb-3">
              <Form.Label>ID Dokter</Form.Label>
              <Form.Control type="text" value={idDokter} onChange={(e) => setIdDokter(e.target.value)} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hari</Form.Label>
              <Form.Control type="text" value={hari} onChange={(e) => setHari(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jam Mulai</Form.Label>
              <Form.Control type="time" placeholder="12:00:00" value={jamMulai} onChange={(e) => setJamMulai(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jam Selesai</Form.Label>
              <Form.Control type="time" placeholder="12:00:00" value={jamSelesai} onChange={(e) => setJamSelesai(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Y">Aktif</option>
                <option value="N">Non-Aktif</option>
              </Form.Select>
            </Form.Group>
            <Button variant="secondary" onClick={handleCloseModal}>
              Tutup
            </Button>
            <Button variant="primary" className="mx-3" type="submit">
              {editData ? "Simpan Perubahan" : "Tambah Jadwal"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default JadwalPeriksa;
