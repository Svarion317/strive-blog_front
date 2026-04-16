import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

function Login({ show, onHide, apiBaseUrl, onLoginSuccess, onOpenSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleClose = () => {
    setError('')
    setSuccessMessage('')
    setPassword('')
    onHide()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload?.message || `Errore ${response.status}`)
      }

      if (payload?.token) {
        localStorage.setItem('striveBlogToken', payload.token)
        onLoginSuccess?.(payload.token)
      }

      setSuccessMessage('Accesso effettuato con successo.')
      setPassword('')
    } catch (loginError) {
      setError(loginError.message || "Errore durante l'accesso")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoToSignup = () => {
    handleClose()
    onOpenSignup?.()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h5 mb-0">Accedi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="d-grid gap-3">
          <Form.Group controlId="loginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </Form.Group>

          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </Form.Group>

          {error && <Alert variant="danger" className="mb-0">{error}</Alert>}
          {successMessage && <Alert variant="success" className="mb-0">{successMessage}</Alert>}

          <Button
            type="submit"
            variant="dark"
            className="w-100 py-2"
            disabled={isLoading}
            style={{ minHeight: '44px' }}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Accesso...
              </>
            ) : (
              'Accedi'
            )}
          </Button>

          <Button
            type="button"
            variant="link"
            className="text-decoration-none p-0 text-start"
            onClick={handleGoToSignup}
          >
            Non hai un account? Iscriviti
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Login
