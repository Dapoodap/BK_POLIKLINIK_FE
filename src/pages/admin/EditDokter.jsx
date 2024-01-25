import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function EditDokter() {
  const location = useLocation();
  const nav = useNavigate();
  const myProp = location.state && location.state.myProp;
  const [namaDokter, setNamaDokter] = useState(myProp?.nama || "");
  const [username, setUsername] = useState(myProp?.username || "");
  const [alamat, setAlamat] = useState(myProp?.alamat || "");
  const [noHp, setNoHp] = useState(myProp?.no_hp || "");
  const [idPoli, setIdPoli] = useState(myProp?.idPoli || "");
  const [poliList, setPoliList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchPoliList = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/poli/getAll");
        setPoliList(response.data.data);
      } catch (error) {
        console.error("Error fetching poli list:", error.response.data);
      }
    };

    fetchPoliList();
  }, []);

  const handleEditDokter = async (e) => {
    e.preventDefault();

    // Validation (you can add more validation as needed)
    if (!namaDokter || !username || !alamat || !noHp || !idPoli) {
      alert("Semua field harus diisi.");
      return;
    }

    const updateData = {
      id: myProp.id, // Assuming you have the id property in your myProp object
      nama: namaDokter,
      id_poli: idPoli,
      username: username,
      alamat: alamat,
      no_hp: noHp,
      role: "dokter"
      // Add other properties as needed
    };

    try {
      // Perform the axios PUT request
      await axios.put(`http://127.0.0.1:8000/api/dokter/UpdateDokter/${myProp.id}`, updateData);

      // Handle success, you can update the UI or show a success message
      console.log("Doctor updated successfully");

      // Show a success alert
      setShowAlert(true);

      // Redirect to the KelolaDokter page after successful edit
      nav("/kelola-dokter")
    } catch (error) {
      alert(error.response.data.error);
      console.error("Error updating doctor:", error.response.data);
    }
  };

  return (
    <>
      <div className="dashboard-container" style={{ display: "flex" }}>
        {localStorage.getItem("token") ? <Sidebar /> : <></>}
        <div className="dashboard-content" style={{ flexGrow: "1", padding: "20px" }}>
          {/* Form to edit a doctor */}
          <Card className="mb-3">
            <Card.Header style={{ backgroundColor: "#007BFF", color: "white" }}>
              <h3>Edit Dokter</h3>
            </Card.Header>
            <Card.Body>
              {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                  Doctor updated successfully!
                </Alert>
              )}
              <Form onSubmit={handleEditDokter}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Dokter</Form.Label>
                  <Form.Control
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
                <Button variant="primary" type="submit">
                  Edit Dokter
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default EditDokter;
