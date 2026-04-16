import Button from "react-bootstrap/Button";

function CreateArticle() {
  return (
    <div className="d-flex justify-content-center justify-content-md-end mt-4 mt-md-0">
      <Button
        type="button"
        variant="dark"
        className="text-uppercase fw-semibold px-4 py-2"
      >
        pubblica articolo
      </Button>
    </div>
  );
}

export default CreateArticle;
