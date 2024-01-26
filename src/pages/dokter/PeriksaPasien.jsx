import { useState, useEffect } from "react";
import { Card, Button, Table } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { jwtDecode } from "jwt-decode";
import { FaStethoscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PeriksaPasien = () => {
  const [daftarPeriksa, setDaftarPeriksa] = useState([]);
  const [, setIdDokter] = useState("");
  const nav = useNavigate();

  const handleEditJadwal = (data) => {
    nav("/edit-periksa", { state: { myProp: data } });
  };

  const handlePeriksaPasien = (data) => {
    nav("/periksa-form", { state: { myProp: data } });
  };

  useEffect(() => {
    const fetchPeriksaanPoli = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      setIdDokter(decodedToken.sub);
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
              <h3>Daftar Periksa Pasien</h3>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No Urut</th>
                    <th>Nama Pasien</th>
                    <th>Keluhan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarPeriksa.map((periksa) => (
                    <tr key={periksa.id}>
                      <td>{periksa.daftar_poli.no_antrian}</td>
                      <td>{periksa.daftar_poli.pasien.nama}</td>
                      <td>{periksa.daftar_poli.keluhan}</td>
                      <td>
                        {periksa.status === "N" ? (
                          <>
                            <Button
                              variant="info"
                              onClick={() => handlePeriksaPasien(periksa)}
                            >
                              <FaStethoscope /> Periksa
                            </Button>{" "}
                          </>
                        ) : (
                          <>
                            <Button
                              variant="info"
                              onClick={() => handleEditJadwal(periksa)}
                            >
                              Edit
                            </Button>{" "}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PeriksaPasien;
