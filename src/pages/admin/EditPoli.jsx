import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useState} from "react";
import axios from "axios";

function EditPoli() {
  const location = useLocation();
  const nav = useNavigate();
  const myProp = location.state && location.state.myProp;
  const [nama_poli, setnama_poli] = useState(myProp?.nama_poli || "");
  const [keterangan, setketerangan] = useState(myProp?.keterangan || "");
  const [showAlert, setShowAlert] = useState(false);


  const handleEditPoli = async (e) => {
    e.preventDefault();

    // Validation (you can add more validation as needed)
    if (!nama_poli || !keterangan ) {
      alert("Semua field harus diisi.");
      return;
    }

    const updateData = {
      id: myProp.id, // Assuming you have the id property in your myProp object
      nama_poli: nama_poli,
      keterangan: keterangan,
    };

    try {
      // Perform the axios PUT request
      await axios.put(`http://127.0.0.1:8000/api/poli/UpdatePoli/${myProp.id}`, updateData);

      // Handle success, you can update the UI or show a success message
      alert('berhasil update poli')
      // Show a success alert
      setShowAlert(true);

      // Redirect to the KelolaDokter page after successful edit
      nav("/kelola-poli")
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
              <h3>Edit Poli</h3>
            </Card.Header>
            <Card.Body>
              {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                  Doctor updated successfully!
                </Alert>
              )}
              <Form onSubmit={handleEditPoli}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Poli</Form.Label>
                  <Form.Control
                    type="text"
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
export default EditPoli