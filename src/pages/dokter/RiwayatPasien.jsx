import { useState, useEffect } from "react";
import { Card, Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { jwtDecode } from "jwt-decode";
import { FaEye } from "react-icons/fa";


const RiwayatPasien = () => {
  const [daftarPeriksa, setDaftarPeriksa] = useState([]);
  const [, setSelectedPeriksa] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [riwayatData, setRiwayatData] = useState([]);


  const handlePeriksaPasien = async (data) => {
    setSelectedPeriksa(data);
    setShowModal(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/detailPeriksa/Periksa/${data.id}`
      );
      setRiwayatData(response.data.data);
    } catch (error) {
      console.error("Error fetching riwayat data:", error.response.data);
    }
  };

  useEffect(() => {
    const fetchPeriksaanPoli = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/periksa/ByIdDokter/${decodedToken.sub}`
        );
        setDaftarPeriksa(response.data.data);
      } catch (error) {
        console.error("Error fetching schedule list:", error.response.data);
      }
    };

    fetchPeriksaanPoli();
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
            <Card.Header
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h3>Riwayat Pasien</h3>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Pasien</th>
                    <th>Alamat</th>
                    <th>No. KTP</th>
                    <th>No. Telepon</th>
                    <th>No. RM</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarPeriksa.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.daftar_poli.pasien.nama}</td>
                      <td>{data.daftar_poli.pasien.alamat}</td>
                      <td>{data.daftar_poli.pasien.no_ktp}</td>
                      <td>{data.daftar_poli.pasien.no_hp}</td>
                      <td>{data.daftar_poli.pasien.no_rm}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handlePeriksaPasien(data)}
                        >
                          <FaEye className="mx-1" />
                          Riwayat
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>

        {/* Riwayat Modal */}
        <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Riwayat Pasien</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {riwayatData &&
            riwayatData.length > 0 &&
            riwayatData[0].periksa &&
            riwayatData[0].periksa.status === "Y" ? (
              <>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Tanggal Periksa</th>
                      <th>Nama Pasien</th>
                      <th>Nama Dokter</th>
                      <th>Keluhan</th>
                      <th>Catatan</th>
                      <th>Obat</th>
                      <th>Biaya Periksa</th>
                      {/* Add more columns if needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {riwayatData
                      .reduce((acc, riwayat, ) => {
                        const existingIndex = acc.findIndex(
                          (item) => item.id_periksa === riwayat.id_periksa
                        );
                        if (existingIndex !== -1) {
                          // If the record already exists, concatenate the obat name
                          acc[existingIndex].obat.push(riwayat.obat.nama_obat);
                        } else {
                          // If the record doesn't exist, create a new one
                          acc.push({
                            ...riwayat.periksa,
                            id_periksa: riwayat.id_periksa,
                            nama_pasien:
                              riwayat.periksa.daftar_poli.pasien.nama,
                            nama_dokter:
                              riwayat.periksa.daftar_poli.jadwal_periksa.dokter
                                .nama,
                            keluhan: riwayat.periksa.daftar_poli.keluhan,
                            catatan: riwayat.periksa.catatan,
                            obat: [riwayat.obat.nama_obat], // Create an array for obat names
                            biaya_periksa: riwayat.periksa.biaya_periksa,
                          });
                        }
                        return acc;
                      }, [])
                      .map((riwayat, index) => (
                        <tr key={riwayat.id_periksa}>
                          <td>{index + 1}</td>
                          <td>{riwayat.tanggal}</td>
                          <td>{riwayat.nama_pasien}</td>
                          <td>{riwayat.nama_dokter}</td>
                          <td>{riwayat.keluhan}</td>
                          <td>{riwayat.catatan}</td>
                          <td>{riwayat.obat.join(", ")}</td>{" "}
                          {/* Join obat names with commas */}
                          <td>{riwayat.biaya_periksa}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <>
                <h1>Belum Diperiksa</h1>
              </>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default RiwayatPasien;
