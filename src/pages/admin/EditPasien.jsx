import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useState} from "react";
import axios from "axios";

function EditPasien() {
  const location = useLocation();
  const nav = useNavigate();
  const myProp = location.state && location.state.myProp;
  const [nama, setNama] = useState(myProp?.nama || "");
  const [username, setUsername] = useState(myProp?.username || "");
  const [alamat, setAlamat] = useState(myProp?.alamat || "");
  const [no_hp, setno_hp] = useState(myProp?.no_hp || "");
  const [no_ktp, setno_ktp] = useState(myProp?.no_ktp || "");
  const [showAlert, setShowAlert] = useState(false);


  const handleEditPasien = async (e) => {
    e.preventDefault();

    // Validation (you can add more validation as needed)
    if (!nama || !username || !alamat || !no_hp || !no_ktp) {
      alert("Semua field harus diisi.");
      return;
    }

    const updateData = {
      id: myProp.id, // Assuming you have the id property in your myProp object
      nama: nama,
      username: username,
      alamat: alamat,
      no_hp: no_hp,
      no_ktp: no_ktp
      // Add other properties as needed
    };

    try {
      // Perform the axios PUT request
      await axios.put(`http://127.0.0.1:8000/api/pasien/UpdatePasien/${myProp.id}`, updateData);

      // Handle success, you can update the UI or show a success message
      console.log("Doctor updated successfully");

      // Show a success alert
      setShowAlert(true);

      // Redirect to the KelolaDokter page after successful edit
      nav("/kelola-pasien")
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
              <h3>Edit Pasien</h3>
            </Card.Header>
            <Card.Body>
              {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                  Doctor updated successfully!
                </Alert>
              )}
              <Form onSubmit={handleEditPasien}>
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
                <Button variant="primary" type="submit">
                  Edit Pasien
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default EditPasien