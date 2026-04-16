import { useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Subscribe from './Subscribe'
import Login from './Login'

function NavbarAuthPanel() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('striveBlogToken') || '')

  const apiBaseUrl = useMemo(
    () => import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    [],
  )

  const handleSignupSuccess = () => {
    setShowSignupModal(false)
    setShowLoginModal(true)
  }

  return (
    <>
      <div className="auth-actions d-grid gap-2 d-sm-flex">
        <Button
          type="button"
          variant="dark"
          size="sm"
          className="w-100 px-2 py-1"
          onClick={() => setShowLoginModal(true)}
        >
          Accedi
        </Button>
        <Button
          type="button"
          variant="outline-dark"
          size="sm"
          className="w-100 px-2 py-1"
          onClick={() => setShowSignupModal(true)}
        >
          Iscriviti
        </Button>
      </div>

      <Login
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        apiBaseUrl={apiBaseUrl}
        onLoginSuccess={(token) => setAuthToken(token)}
        onOpenSignup={() => setShowSignupModal(true)}
      />

      <Subscribe
        show={showSignupModal}
        onHide={() => setShowSignupModal(false)}
        apiBaseUrl={apiBaseUrl}
        authToken={authToken}
        onSignupSuccess={handleSignupSuccess}
      />
    </>
  )
}

export default NavbarAuthPanel
