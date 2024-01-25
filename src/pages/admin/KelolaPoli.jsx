import { useState, useEffect } from "react";
import { Card, Form, Button, Table, Alert } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const KelolaPoli = () => {
  const [nama_poli, setnama_poli] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [daftarpoli, setdaftarpoli] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const nav = useNavigate()

  const handleEditPoli = (data) =>{
    nav('/edit-poli',{ state: { myProp: data } })
  }
  const handleDeletePoli = async (id) => {
    try {
      // Kirim permintaan DELETE ke endpoint yang sesuai
      await axios.delete(`http://127.0.0.1:8000/api/poli/DeletePoli/${id}`);
  
      alert("sukses hapus data")
    
      const response = await axios.get("http://127.0.0.1:8000/api/poli/getAll");
      setdaftarpoli(response.data.data);

    } catch (error) {
      // Handle error, tampilkan pesan kesalahan atau lakukan tindakan lain yang sesuai
      console.error(`Error deleting doctor with ID ${id}:`, error.response.data);
    }
  };
  useEffect(() => {
    const fetchAllPoli = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/poli/getAll"
        );
        setdaftarpoli(response.data.data);
       
      } catch (error) {
        console.error("Error fetching poli list:", error.response.data);
      }
    };

    fetchAllPoli();
  }, []);
  const handleTambahPoli = async (e) => {
    e.preventDefault();

    if (!nama_poli || !keterangan) {
      alert("Semua field harus diisi.");
      return;
    }

    const postData = {
      nama_poli: nama_poli,
      keterangan: keterangan,
    };

    // console.log(postData);
    try {
      await axios.post("http://127.0.0.1:8000/api/poli/PostPoli", postData);
      // Handle success, you can update the UI or show a success message
      console.log("Poli added successfully");

      // Reset the form fields
      setnama_poli("");
      setketerangan("");
      // Fetch the updated list of doctors
      const response = await axios.get("http://127.0.0.1:8000/api/poli/getAll");
      setdaftarpoli(response.data.data);
  
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
              <h3>Tambah Poli</h3>
            </Card.Header>
            <Card.Body>
              {showAlert && (
                <Alert
                  variant="success"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  Poli added successfully!
                </Alert>
              )}
              <Form onSubmit={handleTambahPoli}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Poli</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="poli anak / poli kandungan / poli mulut dan gigi"
                    value={nama_poli}
                    onChange={(e) => setnama_poli(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Keterangan Poli</Form.Label>
                  <Form.Control
                    type="text"
                    value={keterangan}
                    onChange={(e) => setketerangan(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Tambah Poli
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {/* Table to display the list of doctors */}
          <Card>
            <Card.Header><h3>Daftar Poli</h3></Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Poli</th>
                    <th>Keterangan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarpoli ? daftarpoli.map((poli, index) => (
                    <tr key={poli.id}>
                      <td>{index + 1}</td>
                      <td>{poli.nama_poli}</td>
                      <td>{poli.keterangan}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleEditPoli(poli)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => handleDeletePoli(poli.id)}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  )):<></>}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
export default KelolaPoli