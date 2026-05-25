import Note from "./Note";

function Home() {
  return (
    <div>
      <div className="container my-3">
        <h2>Add New Note</h2>

        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>

            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tag">Tag</label>

            <input
              type="text"
              className="form-control"
              id="tag"
              placeholder="tag"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="description"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Note
          </button>
        </form>

        <h2>Your Notes</h2>

        <Note />
      </div>
    </div>
  );
}

export default Home;