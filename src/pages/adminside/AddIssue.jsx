import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createIssueApi,
  deleteIssueApi,
  getPaginatedIssueApi,
} from "../../apis/Api";
import AnimatedWave from "../../components/AnimatedWave";

const AdminIssueDashboard = () => {
  const navigate = useNavigate();

  const articleCardStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    margin: "10px 0",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    backgroundColor: "white",
  };

  const articleImageStyle = {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const articleInfoStyle = {
    flex: "1",
    marginLeft: "20px",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    margin: "0 auto 30px",
  };

  const paginationControlsStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  };

  const paginationButtonStyle = {
    border: "none",
    padding: "10px 15px",
    margin: "0 10px",
    borderRadius: "8px",
    backgroundColor: "#f8c6d1",
    color: "white",
    fontWeight: "bold",
  };
  const [issueName, setIssueName] = useState("");
  const [issueQuestion, setIssueQuestion] = useState("");

  const [issueDescription, setIssueDescription] = useState("");
  const [whatIsIt, setWhatIsIt] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [stat, setStat] = useState("");

  const [issueImage, setIssueImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //image upload function
  const handleImageFunction = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setIssueImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  //load all products when page loads
  const [issues, setIssues] = useState([]);

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch paginated products
  useEffect(() => {
    getPaginatedIssueApi(currentPage).then((res) => {
      if (res.data.success) {
        setIssues(res.data.issues);
        setTotalPages(res.data.totalPages);
      } else {
        toast.error("Failed to fetch issues.");
      }
    });
  }, [currentPage]);

  // ... (existing functions for form submission and deletion)

  // Function to navigate to the next page
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // Function to navigate to the previous page
  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  //submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("issueName", issueName);
    formData.append("issueDescription", issueDescription);
    formData.append("youtubeUrl", youtubeUrl);
    formData.append("stat", stat);
    formData.append("issueQuestion", issueQuestion);
    formData.append("whatIsIt", whatIsIt);

    formData.append("issueImage", issueImage);

    //send request to backend api
    createIssueApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/issueDashboard"); // Navigate to counselor dashboard on success
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  //delete product function
  const handleDelete = (id) => {
    //confirm dialog box
    const confirm = window.confirm(
      "Are you sure you want to delete this detail of issue?"
    );
    if (!confirm) {
      return;
    } else {
      deleteIssueApi(id).then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
    }
  };

  return (
    <>
      <div>
        <AnimatedWave />
      </div>
      <div className="m-4">
        <div className="d-flex justify-content-between">
          <h1 style={headerStyle}>Issue Dashboard</h1>

          <button
            type="button"
            className="btn "
            style={{
              color: "black",
              border: "solid black",
              height: "50px",
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Issue
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 text-center"
                    id="exampleModalLabel"
                  >
                    Create a new Issue for users to read!
                  </h1>
                  <button
                    type="button"
                    className="btn btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label>Issue Name</label>
                  <input
                    onChange={(e) => setIssueName(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter issue name"
                  />
                  <label>Issue Question</label>
                  <input
                    onChange={(e) => setIssueQuestion(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter issue question"
                  />
                  <label htmlFor="">Issue Description</label>
                  <textarea
                    onChange={(e) => setIssueDescription(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter issue description"}
                    cols="2"
                    rows="2"
                  ></textarea>
                  <label htmlFor="">More on Issue</label>
                  <input
                    onChange={(e) => setWhatIsIt(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="Give more on the issue"
                  />

                  <label htmlFor="">Stats</label>
                  <textarea
                    onChange={(e) => setStat(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter stats on the issue"}
                    cols="2"
                    rows="2"
                  ></textarea>
                  <label htmlFor="">YoutubeUrl</label>
                  <textarea
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter url for the video"}
                    cols="2"
                    rows="2"
                  ></textarea>

                  <label> Issue Image</label>
                  <input
                    onChange={handleImageFunction}
                    type="file"
                    className="form-control mb-2"
                  />

                  {/* preview image */}
                  {previewImage && (
                    <img
                      src={previewImage}
                      className="img-fluid rounded object-cover mt-2 "
                    />
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button onClick={handleSubmit} type="button" className="btn">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Make table */}
        <div className="articles-list">
          {issues.map((item) => (
            <div
              key={item._id}
              style={articleCardStyle}
              className="d-flex align-items-center"
            >
              <img
                src={item.issueImageUrl}
                style={articleImageStyle}
                alt={item.issueName}
              />
              <div style={articleInfoStyle}>
                <h5>{item.issueName}</h5>
                <p>{item.issueQuestion}...</p>
              </div>
              <div>
                <Link
                  to={`/admin/edit-issue/${item._id}`}
                  className="btn btn-success mr-4"
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-controls text-center mt-3">
          <button
            className="btn btn-outline-primary mx-2 rounded"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary mx-2 rounded"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminIssueDashboard;
