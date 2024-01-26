import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form, FormCheck } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function LoginPageDokter() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/dokter/LoginDokter', {
            username: username,
            password: password,
          });


          localStorage.setItem('token', response.data.token);
          navigate('/dashboard/dokter')

    
        } catch (error) {
            alert(error.response.data.error)
          console.error('Error logging in:', error.response.data);
        }
      };
  return (
    <Container fluid className="login-page">
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="login-form p-4" style={{ width: '400px', border: '2px solid black' }}>
          <Link to="/" className="text-decoration-none">
          <h1 className="text-center brand-name" style={{ color:'black' }}><b>POLI</b>KLINIK</h1>
            
            </Link>
            <hr className="my-2" />
          <p className="text-center mb-4">Sign in</p>
          <Form className="text-center" onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="username"
                placeholder="Username | Case Sensitive"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password | Case Sensitive"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className="mb-3">
              <FormCheck inline type="checkbox" label="Remember Me" />
            </Form.Group>

            <Button className="my-3" variant="primary" type="submit" style={{ width: '80%', minWidth: '200px' }}>
              Login
            </Button>
          </Form>
        </div>
      </Container>
    </Container>
  )
}

export default LoginPageDokter