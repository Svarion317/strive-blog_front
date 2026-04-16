import BlogFooter from './components/BlogFooter'
import BlogNavbar from './components/BlogNavbar'
import CardsSection from './components/CardsSection'
import HeroSection from './components/HeroSection'
import './App.css'

function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  const postsEndpoint = import.meta.env.VITE_POSTS_API_URL || `${apiBaseUrl}/blogposts`

  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      <BlogNavbar />
      <main>
        <HeroSection />
        <CardsSection endpoint={postsEndpoint} />
      </main>
      <BlogFooter />
    </div>
  )
}

export default App
