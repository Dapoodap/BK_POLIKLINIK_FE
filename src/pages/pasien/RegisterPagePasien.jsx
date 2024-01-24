import { Button, Container, Form, FormCheck, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaHome, FaMobile, FaIdCard, FaLock } from 'react-icons/fa';

function RegisterPagePasien() {
  return (
    <Container fluid className="login-page">
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="login-form p-4" style={{ width: '400px', border: '2px solid black' }}>
          <Link to="/" className="text-decoration-none">
            <h1 className="text-center brand-name" style={{ color:'black' }}><b>POLI</b>KLINIK</h1>
            
          </Link>
          <hr className="my-2" />
          <p className="text-center mb-4">Sign in</p>
          <Form className="text-center">
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="text" placeholder="Nama Lengkap" />
                <InputGroup.Text><FaUser /></InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="text" placeholder="Username" />
                <InputGroup.Text><FaEnvelope /></InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="text" placeholder="Alamat" />
                <InputGroup.Text><FaHome /></InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="number" placeholder="Nomor HP" />
                <InputGroup.Text><FaMobile /></InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="number" placeholder="Nomor KTP" />
                <InputGroup.Text><FaIdCard /></InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control type="password" placeholder="Password" />
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
  )
}

export default RegisterPagePasien;
