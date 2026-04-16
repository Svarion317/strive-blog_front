import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

function Subscribe({ show, onHide, apiBaseUrl, authToken, onSignupSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    birthDate: '',
    avatar: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const resetState = () => {
    setError('')
    setSuccessMessage('')
    setIsLoading(false)
  }

  const handleClose = () => {
    resetState()
    onHide()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await fetch(`${apiBaseUrl}/authors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify(formData),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            'Registrazione non autorizzata: il backend richiede un token valido per creare un autore.',
          )
        }

        throw new Error(payload?.message || `Errore ${response.status}`)
      }

      setSuccessMessage('Utente registrato con successo.')
      onSignupSuccess?.(payload)
      setFormData({
        name: '',
        surname: '',
        email: '',
        birthDate: '',
        avatar: '',
        password: '',
      })
    } catch (submitError) {
      setError(submitError.message || 'Errore durante la registrazione')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h5 mb-0">Iscrizione utente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="d-grid gap-3">
          <Form.Group controlId="signupName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="given-name"
              required
            />
          </Form.Group>

          <Form.Group controlId="signupSurname">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              autoComplete="family-name"
              required
            />
          </Form.Group>

          <Form.Group controlId="signupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </Form.Group>

          <Form.Group controlId="signupBirthDate">
            <Form.Label>Data di nascita</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="signupAvatar">
            <Form.Label>Avatar (URL)</Form.Label>
            <Form.Control
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://..."
              autoComplete="url"
            />
          </Form.Group>

          <Form.Group controlId="signupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={6}
              required
            />
          </Form.Group>

          {error && <Alert variant="danger" className="mb-0">{error}</Alert>}
          {successMessage && <Alert variant="success" className="mb-0">{successMessage}</Alert>}

          <Button
            type="submit"
            variant="primary"
            className="w-100 py-2"
            disabled={isLoading}
            style={{ minHeight: '44px' }}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Invio in corso...
              </>
            ) : (
              'Conferma iscrizione'
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Subscribe
