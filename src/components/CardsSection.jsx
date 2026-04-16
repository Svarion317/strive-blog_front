import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

function CardsSection({ endpoint }) {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean(endpoint))

  useEffect(() => {
    if (!endpoint) {
      setIsLoading(false)
      setPosts([])
      return
    }

    const loadPosts = async () => {
      setIsLoading(true)
      const response = await fetch(endpoint)
      const payload = await response.json()
      setPosts(payload.map((post) => ({ ...post, comments: post.comments ?? [] })))
      setIsLoading(false)
    }

    loadPosts()
  }, [endpoint])

  return (
    <section className="pb-5">
      <Container>
        <h2 className="h4 mb-4">Articoli</h2>

        {isLoading && (
          <div className="d-flex justify-content-center py-4">
            <Spinner animation="border" role="status" />
          </div>
        )}

        <Row className="g-3 g-md-4">
          {posts.map((post, index) => (
            <Col key={post.id ?? post._id ?? index} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0 overflow-hidden">
                {post.cover && (
                  <Card.Img
                    variant="top"
                    src={post.cover}
                    alt={`Cover ${post.title ?? 'articolo'}`}
                    className="post-cover-img"
                    loading="lazy"
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <p className="text-uppercase small fw-semibold text-secondary mb-2 text-break">
                    {post.category ?? 'Senza categoria'}
                  </p>
                  <Card.Title className="mb-2 text-break">{post.title ?? 'Titolo non disponibile'}</Card.Title>
                  <Card.Text className="mb-3 small text-break">
                    <strong>Read time:</strong> {post.readTime?.value ?? '-'} {post.readTime?.unit ?? ''}
                  </Card.Text>

                  <div className="mt-auto">
                    <p className="fw-semibold mb-2">Commenti</p>
                    {Array.isArray(post.comments) && post.comments.length > 0 ? (
                      <ul className="list-unstyled mb-0 d-grid gap-2">
                        {post.comments.map((comment, commentIndex) => (
                          <li
                            key={comment.id ?? `${post.id ?? post._id ?? index}-comment-${commentIndex}`}
                            className="comment-box"
                          >
                            <p className="mb-1 small text-break">{comment.text}</p>
                            <p className="mb-0 small text-secondary text-break">- {comment.author}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mb-0 small text-secondary">Nessun commento</p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default CardsSection
