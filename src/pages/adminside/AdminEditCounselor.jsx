
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleCounselorApi, updateCounselorApi } from "../../apis/Api";

const AdminEditArticle = () => {
  //receive product id from url
  const { id } = useParams();
  //load product data
  useEffect(() => {
    getSingleCounselorApi(id).then((res) => {
      console.log(res.data);
      setCounselorName(res.data.counselor.counselorName);
      setCounselorDescription(res.data.counselor.counselorDescription);
      setCounselorPosition(res.data.counselor.counselorPosition);
      setExpertise(res.data.counselor.expertise);
      setApproach(res.data.counselor.approach);
      setPhilosophy(res.data.counselor.philosophy);
      setEducationalDegree(res.data.counselor.educationalDegree);

      setOldImage(res.data.counselor.counselorImageUrl);
    });
  }, [id]);

  const [counselorName, setCounselorName] = useState("");
  const [counselorDescription, setCounselorDescription] = useState("");
  const [counselorPosition, setCounselorPosition] = useState("");
  const [expertise, setExpertise] = useState("");
  const [approach, setApproach] = useState("");
  const [philosophy, setPhilosophy] = useState("");
  const [educationalDegree, setEducationalDegree] = useState("");

  const [oldImage, setOldImage] = useState("");

  //use state for image
  const [counselorImage, setCounselorImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageFunction = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setCounselorImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  //handle submit function
  const navigate = useNavigate();
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

    formData.append("counselorImage", counselorImage);

    //make a api call
    updateCounselorApi(id, formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/counselorDashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error!");
      });
  };

  return (
    <>
      <div className="m-4">
        <h3>
          Editing article - <span className="text-danger">{counselorName}</span>
        </h3>
        <div className="d-flex gap-3">
          <form action="">
            {/* Name, Description, price, category(select), image */}

            <label>Counselor Name</label>
            <input
              value={counselorName}
              onChange={(e) => setCounselorName(e.target.value)}
              className="form-control mb-2"
              type="text"
              name=""
              id=""
              placeholder="Enter article name"
            />
            <label htmlFor="">Counselor Description</label>
            <textarea
              value={counselorDescription}
              onChange={(e) => setCounselorDescription(e.target.value)}
              className="form-control mb-2"
              placeholder={"Enter description"}
              cols="4"
              rows="4"
            ></textarea>

            <label> Counselor Image</label>
            <input
              onChange={handleImageFunction}
              type="file"
              className="form-control mb-2"
            />
            <button
              onClick={handleSubmit}
              className="btn btn-primary w-100 mt-2"
            >
              Update Counselor
            </button>
          </form>
          <div>
            <h6>Old Image Preview</h6>
            <img
              className="img-fluid rounded-4 object-fit-cover"
              width={200}
              height={200}
              src={oldImage}
              alt=""
            />
            <h6 className="mt-4">New Image</h6>
            {previewImage ? (
              <img
                src={previewImage}
                alt="product Image"
                className="img-fluid rounded-4 object-fit-cover"
                width={200}
                height={200}
              />
            ) : (
              <p>No image selected!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditArticle;
