import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createCounselorApi,
  deleteCounselorApi,
  getPaginatedCounselorsApi,
} from "../../apis/Api";
import AnimatedWave from "../../components/AnimatedWave";

const AdminArticleDashboard = () => {
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
  const [counselorName, setCounselorName] = useState("");
  const [counselorDescription, setCounselorDescription] = useState("");
  const [counselorPosition, setCounselorPosition] = useState("");
  const [expertise, setExpertise] = useState("");
  const [approach, setApproach] = useState("");
  const [philosophy, setPhilosophy] = useState("");
  const [educationalDegree, setEducationalDegree] = useState("");
  const [counselorCode, setCounselorCode] = useState("");

  const [counselorImage, setCounselorImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //image upload function
  const handleImageFunction = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setCounselorImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  //load all products when page loads
  const [counselors, setCounselors] = useState([]);

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch paginated products
  useEffect(() => {
    getPaginatedCounselorsApi(currentPage).then((res) => {
      if (res.data.success) {
        setCounselors(res.data.counselors);
        setTotalPages(res.data.totalPages);
      } else {
        toast.error("Failed to fetch counselors.");
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

    formData.append("counselorName", counselorName);
    formData.append("counselorDescription", counselorDescription);
    formData.append("counselorPosition", counselorPosition);
    formData.append("expertise", expertise);
    formData.append("approach", approach);
    formData.append("philosophy", philosophy);
    formData.append("educationalDegree", educationalDegree);
    formData.append("counselorCode", counselorCode);

    formData.append("counselorImage", counselorImage);

    //send request to backend api
    createCounselorApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/counselorDashboard"); // Navigate to counselor dashboard on success
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
      "Are you sure you want to delete this detail of counselor?"
    );
    if (!confirm) {
      return;
    } else {
      deleteCounselorApi(id).then((res) => {
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
          <h1 style={headerStyle}>Counselor Dashboard</h1>

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
            Add Counselors
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
                    Create a new profile for counselor!
                  </h1>
                  <button
                    type="button"
                    className="btn btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label>Counselor Name</label>
                  <input
                    onChange={(e) => setCounselorName(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter counselor name"
                  />
                  <label htmlFor="">Counselor Description</label>
                  <textarea
                    onChange={(e) => setCounselorDescription(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter description"}
                    cols="2"
                    rows="2"
                  ></textarea>
                  <label htmlFor="">Counselor Position</label>
                  <input
                    onChange={(e) => setCounselorPosition(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter counselor position"
                  />

                  <label htmlFor="">Expertise</label>
                  <textarea
                    onChange={(e) => setExpertise(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter expertise"}
                    cols="2"
                    rows="2"
                  ></textarea>
                  
                  <label htmlFor="counselorCode">Counselor Code</label>
                  <input
                    type="number"
                    onChange={(e) => setCounselorCode(e.target.value)}
                    className="form-control mb-2"
                    placeholder="Enter counselor code"
                    id="counselorCode"
                  />

                  <label htmlFor="">Approach</label>
                  <textarea
                    onChange={(e) => setApproach(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter approach"}
                    cols="2"
                    rows="2"
                  ></textarea>
                  <label htmlFor="">Philosophy</label>

                  <textarea
                    onChange={(e) => setPhilosophy(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter philosophy"}
                    cols="2"
                    rows="2"
                  ></textarea>
                  <label htmlFor="">Educational Degree</label>

                  <textarea
                    onChange={(e) => setEducationalDegree(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter educational degree"}
                    cols="2"
                    rows="2"
                  ></textarea>

                  <label> Counselor Image</label>
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
          {counselors.map((item) => (
            <div
              key={item._id}
              style={articleCardStyle}
              className="d-flex align-items-center"
            >
              <img
                src={item.counselorImageUrl}
                style={articleImageStyle}
                alt={item.counselorName}
              />
              <div style={articleInfoStyle}>
                <h5>{item.counselorName}</h5>
                <p>{item.counselorDescription.slice(0, 100)}...</p>
              </div>
              <div>
                <Link
                  to={`/admin/edit-counselor/${item._id}`}
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
        {/* <table className="table  table-striped mt-2">
          <thead className="table-dark">
            <tr>
              <th scope="col">Article Image</th>
              <th scope="col">Article Name</th>
              <th scope="col">Article Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item) => (
              <tr>
                <td>
                  <img src={item.articleImageUrl} height={40} width={40} />
                </td>
                <td>{item.articleName}</td>
                <td>{item.articleDescription.slice(0, 10)}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <Link
                      to={`/admin/edit-article/${item._id}`}
                      type="button"
                      className="btn btn-success"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      type="button"
                      className="btn btn-primary btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
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

export default AdminArticleDashboard;
