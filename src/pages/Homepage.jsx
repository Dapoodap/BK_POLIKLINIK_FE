import { Card, Container } from "react-bootstrap";
import icon from "../assets/home.png";
import komen from "../assets/komen.png";
import { Link } from "react-router-dom";


function Homepage() {
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3Bhc2llbi9Mb2dpblBhc2llbiIsImlhdCI6MTcwNjA4MzczMSwiZXhwIjoxNzA2MTcwMTMxLCJuYmYiOjE3MDYwODM3MzEsImp0aSI6Im1TVkpFdGVSTlRCR0xZSjMiLCJzdWIiOiI0MTcxODZkNS0wYzEzLTQ1MGQtOGE3Yy04MDEzMzk1MDQ5MTMiLCJwcnYiOiJmZWVlMzNkNWUyNjdhMDU3MzE2ZTVmMjM0ZGM2MjYxMDAyOTM0MTIzIiwiaWQiOiI0MTcxODZkNS0wYzEzLTQ1MGQtOGE3Yy04MDEzMzk1MDQ5MTMiLCJyb2xlIjoicGFzaWVuIn0.ezFWSrIdGhDMBeXta7yfc-vU7ec3mrZp5N8JAleXDi4'
    // try {
    //     // Mendekode token
    //     const decodedToken = jwtDecode(token);
      
    //     // Mendapatkan informasi dari payload
    //     const userId = decodedToken.sub;  // Subjek atau ID pengguna
    //     const userRole = decodedToken.role; // Contoh klaim tambahan 'role'
      
    //     console.log('Token decoded successfully');
    //     console.log('User ID:', userId);
    //     console.log('User Role:', userRole);
    //     console.log('Decoded Token:', decodedToken);
    //   } catch (error) {
    //     // Token tidak valid atau terjadi kesalahan lain
    //     console.error('Invalid token:', error.message);
    //   }
  return (
    <>
      <Container
        fluid
        className="text-center d-flex justify-content-center align-items-center text-center"
        style={{ backgroundColor: "#224b8e", height: "300px" }}
      >
        <div style={{ maxWidth: "350px", height: "fit-content" }}>
          <h1 style={{ fontSize: "40px", fontWeight: "700", color: "white" }}>
            Sistem temu Janji Pasien - Dokter
          </h1>
          <p style={{ color: "white", fontSize: "15px" }}>
            Bimbingan karir bidang web 2023
          </p>
        </div>
      </Container>
      <br />
      <br />
      <Container
        fluid
        className="text-left d-flex justify-content-center align-items-center text-center p-5"
        style={{ height: "fit-content", gap: "50px", flexWrap: "wrap" }}
      >
        <div
          style={{
            maxWidth: "500px",
            height: "fit-content",
            textAlign: "left",
          }}
        >
          <img src={icon} alt="" style={{ width: "60px" }} />
          <h4 className="my-3">Login Sebagai Pasien</h4>
          <p>
            Apabila Anda adalah seorang Pasien, silahkan Login terlebih dahulu
            untuk melakukan pendaftaran sebagai Pasien!
          </p>
          <Link to={"/pasien/login"}>klink link Berikut →</Link>
        </div>
        <div
          style={{
            maxWidth: "500px",
            height: "fit-content",
            textAlign: "left",
          }}
        >
          <img src={icon} alt="" style={{ width: "60px" }} />
          <h4 className="my-3">Login Sebagai Dokter</h4>
          <p>
            Apabila Anda adalah seorang Dokter, silahkan Login terlebih dahulu
            untuk memulai melayani Pasien!
          </p>
          <Link to={"/dokter/login"}>klink link Berikut →</Link>
        </div>
      </Container>
      <hr className="my-5" />

      <Container
        fluid
        className="text-left d-flex justify-content-center align-items-center text-center p-5"
        style={{
          height: "fit-content",
          gap: "50px",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <div>
          <h1 className="text-centre">Testimoni Pasien</h1>
          <p>Para pasien yang setia</p>
        </div>
        <Card style={{ maxWidth: "40rem" }}>
          <Card.Body>
            <Card.Text className="d-flex justify-content-center align-items-center gap-3 " style={{ textAlign:'left'}}>
                <img src={komen} alt="" style={{ width:'50px',objectFit:'cover'}}/>
              <div>
              <div>
                <p style={{ fontSize:'15px',fontWeight:'500' }}> Pelayanan di web ini sangat cepat dan mudah. Detail histori tercatat lengkap, termasuk catatan obat. Harga pelayanan terjangkau, Dokter ramah, pokoke mantab pol!.</p>
              </div>
              <p style={{ fontSize:'15px',fontWeight:'200' }}>- Adi, Semarang</p>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ maxWidth: "40rem" }}>
          <Card.Body>
            <Card.Text className="d-flex justify-content-center align-items-center gap-3 " style={{ textAlign:'left'}}>
                <img src={komen} alt="" style={{ width:'50px',objectFit:'cover'}}/>
              <div>
              <div>
                <p style={{ fontSize:'15px',fontWeight:'500' }}> Pelayanan di web ini sangat cepat dan mudah. Detail histori tercatat lengkap, termasuk catatan obat. Harga pelayanan terjangkau, Dokter ramah, pokoke mantab pol!.</p>
              </div>
              <p style={{ fontSize:'15px',fontWeight:'200' }}>- Adi, Semarang</p>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        
      </Container>
    </>
  );
}

export default Homepage;
