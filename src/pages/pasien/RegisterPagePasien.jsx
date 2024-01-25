import { useState } from 'react';
import { Button, Container, Form, FormCheck, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaHome, FaMobile, FaIdCard, FaLock } from 'react-icons/fa';
import axios from 'axios';

function RegisterPagePasien() {
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    alamat: '',
    no_hp: '',
    no_ktp: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/pasien/PostPasien', formData);

      // Handle success, you can update the UI or show a success message
      console.log('Pasien registered successfully');

      // Redirect or perform other actions after successful registration
    } catch (error) {
      // Handle error, you can show an error message or perform other actions
      console.error('Error registering pasien:', error.response.data);
    }
  };

  return (
    <Container fluid className="login-page">
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="login-form p-4" style={{ width: '400px', border: '2px solid black' }}>
          <Link to="/" className="text-decoration-none">
            <h1 className="text-center brand-name" style={{ color: 'black' }}><b>POLI</b>KLINIK</h1>
          </Link>
          <hr className="my-2" />
          <p className="text-center mb-4">Register</p>
          <Form className="text-center" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="text" placeholder="Nama Lengkap" name="nama" onChange={handleChange} />
                <InputGroup.Text><FaUser /></InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="text" placeholder="Username" name="username" onChange={handleChange} />
                <InputGroup.Text><FaEnvelope /></InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="text" placeholder="Alamat" name="alamat" onChange={handleChange} />
                <InputGroup.Text><FaHome /></InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="number" placeholder="Nomor HP" name="no_hp" onChange={handleChange} />
                <InputGroup.Text><FaMobile /></InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="number" placeholder="Nomor KTP" name="no_ktp" onChange={handleChange} />
                <InputGroup.Text><FaIdCard /></InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                <InputGroup.Text><FaLock /></InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <FormCheck inline type="checkbox" label="Remember Me" />
            </Form.Group>

            <Button className="my-3" variant="primary" type="submit" style={{ width: '80%', minWidth: '200px' }}>
              Register
            </Button>
          </Form>

          <div className="text-center mt-4">
            <Link to="/pasien/login">Sudah punya Akun</Link>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default RegisterPagePasien;
