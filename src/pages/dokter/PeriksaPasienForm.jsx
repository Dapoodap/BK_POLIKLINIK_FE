import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Alert, Button, Card, Form } from "react-bootstrap";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";

function PeriksaPasienForm() {
  const location = useLocation();
  const nav = useNavigate();
  const myProp = location.state && location.state.myProp;
  const [nama] = useState(myProp?.daftar_poli.pasien.nama || "");
  const [tanggal, setTanggal] = useState("");
  const [catatan, setCatatan] = useState('');
  const [selectedObat, setSelectedObat] = useState([]);
  const [obatOptions, setObatOptions] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [totalHarga, setTotalHarga] = useState(0);

  useEffect(() => {
    // Fetch obat data from the API
    axios.get("http://127.0.0.1:8000/api/obat/getAll")
      .then(response => {
        // Set the obat options in state
        setObatOptions(response.data.data.map(obat => ({ value: obat.id, label: obat.nama_obat, harga: obat.harga })));
      })
      .catch(error => {
        console.error("Error fetching obat data:", error);
      });
  }, []); 

  useEffect(() => {
    // Calculate total harga when selectedObat changes
    const calculateTotalHarga = () => {
      const total = selectedObat.reduce((acc, obat) => {
        const obatData = obatOptions.find(option => option.value === obat.value);
        return acc + (obatData ? obatData.harga : 0);
      }, 0);
      setTotalHarga(250000+total);
    };
    calculateTotalHarga();
  }, [selectedObat, obatOptions]);

  const handlePeriksaPasien = async (e) => {
    e.preventDefault();

    // Validation (you can add more validation as needed)
    if (!tanggal || !catatan || selectedObat.length === 0 || !totalHarga) {
      alert("Semua field harus diisi.");
      return;
    }

    const obatArray = selectedObat.map(obat => obat.value);
    const updateData = {
      id_daftar_poli: myProp.id_daftar_poli,
      tanggal: tanggal,
      catatan: catatan,
      obat: selectedObat.toString(),
      biaya_periksa: totalHarga,
      status : 'Y'
    };
    try {
      // Perform the axios PUT request to update the status
      await axios.put(`http://127.0.0.1:8000/api/periksa/UpdatePeriksa/${myProp.id}`, updateData);

      // Perform the axios POST request to post data to /detailPeriksa/PostJadwal
      for (const obatId of obatArray) {
        await axios.post("http://127.0.0.1:8000/api/detailPeriksa/PostDetail", {
          id_periksa: myProp.id,
          id_obat: obatId
        });
      }

      // Show a success alert
      alert('berhasil memeriksa')

      // Redirect to the KelolaPasien page after successful edit
      nav("/periksa-pasien");
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          alert("Error adding periksa data: " + error.response.data.error);
          console.error("Error adding periksa data:", error.response.data);
        } else {
          alert("An unexpected error occurred while adding periksa data.");
          console.error("Unexpected error adding periksa data:", error);
        }
      }
  };

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
                  Pasien periksa added successfully!
                </Alert>
              )}
              <Form onSubmit={handlePeriksaPasien}>
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
                    options={obatOptions}
                    value={selectedObat}
                    onChange={(selectedOptions) => setSelectedObat(selectedOptions)}
                    isSearchable // Enable search
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Total Harga</Form.Label>
                  <Form.Control type="text" value={totalHarga} readOnly />
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

export default PeriksaPasienForm;
