import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useState} from "react";
import axios from "axios";

function EditObat() {
  const location = useLocation();
  const nav = useNavigate();
  const myProp = location.state && location.state.myProp;
  const [nama_obat, setnama_obat] = useState(myProp?.nama_obat || "");
  const [kemasan, setkemasan] = useState(myProp?.kemasan || "");
  const [harga, setharga] = useState(myProp?.harga || "");
  const [showAlert, setShowAlert] = useState(false);


  const handleEditObat = async (e) => {
    e.preventDefault();

    // Validation (you can add more validation as needed)
    if (!nama_obat || !kemasan || !harga ) {
      alert("Semua field harus diisi.");
      return;
    }

    const updateData = {
      id: myProp.id, // Assuming you have the id property in your myProp object
      nama_obat: nama_obat,
      kemasan: kemasan,
      harga: harga,
    };

    try {
      // Perform the axios PUT request
      await axios.put(`http://127.0.0.1:8000/api/obat/UpdateObat/${myProp.id}`, updateData);

      // Handle success, you can update the UI or show a success message
      alert('berhasil update obat')
      // Show a success alert
      setShowAlert(true);

      // Redirect to the KelolaDokter page after successful edit
      nav("/kelola-obat")
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
              <Form onSubmit={handleEditObat}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Obat</Form.Label>
                  <Form.Control
                    type="text"
                    value={nama_obat}
                    onChange={(e) => setnama_obat(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Kemasan</Form.Label>
                  <Form.Control
                    type="text"
                    value={kemasan}
                    onChange={(e) => setkemasan(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Keterangan Poli</Form.Label>
                  <Form.Control
                    type="number"
                    value={harga}
                    onChange={(e) => setharga(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Edit Poli
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
export default EditObat