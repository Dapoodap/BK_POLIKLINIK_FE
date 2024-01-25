import { useState, useEffect } from "react";
import { Card, Form, Button, Table, Alert } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const KelolaObat = () => {
  const [nama_obat, setnama_obat] = useState("");
  const [kemasan, setkemasan] = useState("");
  const [harga, setharga] = useState("");
  const [daftarobat, setdaftarobat] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const nav = useNavigate()

  const handleEditObat = (data) =>{
    nav('/edit-obat',{ state: { myProp: data } })
  }
  const handleDeleteObat = async (id) => {
    try {
      // Kirim permintaan DELETE ke endpoint yang sesuai
      await axios.delete(`http://127.0.0.1:8000/api/obat/DeleteObat/${id}`);
  
      alert("sukses hapus data")
    
      const response = await axios.get("http://127.0.0.1:8000/api/obat/getAll");
      setdaftarobat(response.data.data);

    } catch (error) {
      // Handle error, tampilkan pesan kesalahan atau lakukan tindakan lain yang sesuai
      console.error(`Error deleting doctor with ID ${id}:`, error.response.data);
    }
  };
  useEffect(() => {
    const fetchAllObat = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/obat/getAll"
        );
        setdaftarobat(response.data.data);
       
      } catch (error) {
        console.error("Error fetching obat list:", error.response.data);
      }
    };

    fetchAllObat();
  }, []);
  const handleTambahObat = async (e) => {
    e.preventDefault();

    if (!nama_obat || !kemasan|| !harga) {
      alert("Semua field harus diisi.");
      return;
    }

    const postData = {
      nama_obat: nama_obat,
      kemasan : kemasan,
      harga: harga,
    };

    // console.log(postData);
    try {
      await axios.post("http://127.0.0.1:8000/api/obat/PostObat", postData);
      // Handle success, you can update the UI or show a success message
      console.log("Obat added successfully");

      // Reset the form fields
      setnama_obat("");
      setkemasan("");
      setharga("");
      // Fetch the updated list of doctors
      const response = await axios.get("http://127.0.0.1:8000/api/obat/getAll");
      setdaftarobat(response.data.data);
  
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
              <h3>Tambah Obat</h3>
            </Card.Header>
            <Card.Body>
              {showAlert && (
                <Alert
                  variant="success"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  Obat added successfully!
                </Alert>
              )}
              <Form onSubmit={handleTambahObat}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Obat</Form.Label>
                  <Form.Control
                    type="text"
                    value={nama_obat}
                    onChange={(e) => setnama_obat(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Kemasan Obat</Form.Label>
                  <Form.Control
                    type="text"
                    value={kemasan}
                    onChange={(e) => setkemasan(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Harga Obat</Form.Label>
                  <Form.Control
                    type="number"
                    value={harga}
                    onChange={(e) => setharga(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Tambah Obat
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {/* Table to display the list of doctors */}
          <Card>
            <Card.Header><h3>Daftar Obat</h3></Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Obat</th>
                    <th>kemasan</th>
                    <th>harga</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarobat ? daftarobat.map((obat, index) => (
                    <tr key={obat.id}>
                      <td>{index + 1}</td>
                      <td>{obat.nama_obat}</td>
                      <td>{obat.kemasan}</td>
                      <td>Rp. {obat.harga}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleEditObat(obat)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteObat(obat.id)}
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
export default KelolaObat