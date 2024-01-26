import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function EditPeriksa() {
  const location = useLocation();
  const nav = useNavigate();
  const myProp = location.state && location.state.myProp;

  const [nama] = useState(myProp?.daftar_poli.pasien.nama || "");
  const [obatOptions, setObatOptions] = useState([]);
  const [selectedObat, setSelectedObat] = useState([]);
  const [catatan, setCatatan] = useState(myProp?.catatan || "");
  const [tanggal, setTanggal] = useState(myProp?.tanggal || "");
  const [showAlert, setShowAlert] = useState(false);
  const [totalHargaObat, setTotalHargaObat] = useState(0);

  useEffect(() => {
    const fetchObatOptions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/obat/getAll");
        const options = response.data.data.map((obat) => ({
          value: obat.id,
          label: obat.nama_obat,
          harga: obat.harga,
        }));
        setObatOptions(options);
      } catch (error) {
        console.error("Error fetching obat options:", error.response.data);
      }
    };

    fetchObatOptions();
  }, []);

  useEffect(() => {
    const fetchObat = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/detailPeriksa/Periksa/${myProp.id}`);
        const obatData = response.data.data.map((obat) => ({
          value: obat.id_obat,
          label: obat.obat.nama_obat,
          harga: obat.obat.harga,
        }));

        setSelectedObat(obatData);
      } catch (error) {
        console.error("Error fetching obat data:", error.response.data);
      }
    };

    fetchObat();
  }, [myProp.id]);

  useEffect(() => {
    const calculateTotalHargaObat = () => {
      let total = 0;
      selectedObat.forEach((obat) => {
        total += obat.harga || 0;
      });
      setTotalHargaObat(250000+total);
    };

    calculateTotalHargaObat();
  }, [selectedObat]);
// ... (previous code)

const handleUpdatePeriksa = async (e) => {
    e.preventDefault();
  
    // Validation (you can add more validation as needed)
    if (!tanggal || !catatan || selectedObat.length === 0 || !totalHargaObat) {
      alert("Semua field harus diisi.");
      return;
    }
  
    const obatArray = selectedObat.map(obat => obat.value);
    const updateData = {
      id_daftar_poli: myProp.id_daftar_poli,
      tanggal: tanggal,
      catatan: catatan,
      obat: selectedObat.map(obat => obat.value).join(','),
      biaya_periksa: totalHargaObat,
      status: 'Y'
    };
  
    try {
      // Delete existing detail records by periksa id
      await axios.delete(`http://127.0.0.1:8000/api/detailPeriksa/destroyDetailByPeriksaId/${myProp.id}`);
      const response = await axios.get(`http://127.0.0.1:8000/api/detailPeriksa/getAll`);
      console.log(response.data)
  
      // Update periksa record
      await axios.put(`http://127.0.0.1:8000/api/periksa/UpdatePeriksa/${myProp.id}`, updateData);
  
      // Add new detail records
      for (const obatId of obatArray) {
        console.log("id obat : ",obatId)
        await axios.post("http://127.0.0.1:8000/api/detailPeriksa/PostDetail", {
          id_periksa: myProp.id,
          id_obat: obatId
        });
      }
  
      // Show a success alert
      alert('berhasil update')
  
      // Redirect to the KelolaPasien page after successful edit
      nav("/periksa-pasien");
    } catch (error) {
      alert("Error updating periksa data: " + error.response.data.error);
      console.error("Error updating periksa data:", error.response.data);
    }
  };
  
  // ... (remaining code)
  
  return (
    <>
      <div className="dashboard-container" style={{ display: "flex" }}>
        {localStorage.getItem("token") ? <Sidebar /> : <></>}
        <div className="dashboard-content" style={{ flexGrow: "1", padding: "20px" }}>
          <Card className="mb-3">
            <Card.Header style={{ backgroundColor: "#007BFF", color: "white" }}>
              <h3>Periksa Pasien</h3>
            </Card.Header>
            <Card.Body>
              {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                  Updated successfully!
                </Alert>
              )}
              <Form onSubmit={handleUpdatePeriksa}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Pasien</Form.Label>
                  <Form.Control type="text" value={nama} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Control type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Catatan</Form.Label>
                  <Form.Control as="textarea" value={catatan} onChange={(e) => setCatatan(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Obat</Form.Label>
                  <Select
                    isMulti
                    options={obatOptions.filter((item1) => selectedObat.every((item2) => item1.label !== item2.label))}
                    value={selectedObat}
                    onChange={(selectedOptions) => setSelectedObat(selectedOptions)}
                    isSearchable
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Total Harga</Form.Label>
                  <Form.Control type="text" value={totalHargaObat} readOnly />
                </Form.Group>
                <Button variant="warning" type="submit">
                  Periksa Pasien
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default EditPeriksa;
