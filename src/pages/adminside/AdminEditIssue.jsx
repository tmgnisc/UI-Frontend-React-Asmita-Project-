import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleIssueApi, updateIssueApi } from "../../apis/Api";

const AdminEditIssue = () => {
  //receive id from url
  const { id } = useParams();
  //load product data
  useEffect(() => {
    getSingleIssueApi(id).then((res) => {
      console.log(res.data);
      setIssueName(res.data.issue.issueName);
      setIssueQuestion(res.data.issue.setIssueQuestion);
      setIssueDescription(res.data.issue.issueDescription);
      setYoutubeUrl(res.data.issue.youtubeUrl);
      setStat(res.data.issue.stat);
      setWhatIsIt(res.data.issue.whatIsIt);

      setOldImage(res.data.issue.issueImageUrl);
    });
  }, [id]);

  const [issueName, setIssueName] = useState("");
  const [issueQuestion, setIssueQuestion] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [stat, setStat] = useState("");
  const [whatIsIt, setWhatIsIt] = useState("");

  const [oldImage, setOldImage] = useState("");

  //use state for image
  const [issueImage, setIssueImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageFunction = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setIssueImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  //handle submit function
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("issueName", issueName);
    formData.append("issueQuestion", issueQuestion);
    formData.append("issueDescription", issueDescription);
    formData.append("youtubeUrl", youtubeUrl);
    formData.append("stat", stat);
    formData.append("whatIsIt", whatIsIt);

    formData.append("issueImage", issueImage);

    //make a api call
    updateIssueApi(id, formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/issueDashboard");
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
          Editing issue - <span className="text-danger">{issueName}</span>
        </h3>
        <div className="d-flex gap-3">
          <form action="">
            {/* Name, Description, price, category(select), image */}

            <label>Issue Name</label>
            <input
              value={issueName}
              onChange={(e) => setIssueName(e.target.value)}
              className="form-control mb-2"
              type="text"
              name=""
              id=""
              placeholder="Enter issue name"
            />
            <label>Issue Question</label>
            <input
              value={issueQuestion}
              onChange={(e) => setIssueQuestion(e.target.value)}
              className="form-control mb-2"
              type="text"
              name=""
              id=""
              placeholder="Enter issue question"
            />
            <label htmlFor="">Issue Description</label>
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className="form-control mb-2"
              placeholder={"Enter description"}
              cols="4"
              rows="4"
            ></textarea>
            <label htmlFor="">Issue youtubeUrl</label>
            <textarea
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="form-control mb-2"
              placeholder={"Enter youtubeUrl"}
              cols="4"
              rows="4"
            ></textarea>
            <label htmlFor="">Issue whatIsIt</label>
            <textarea
              value={whatIsIt}
              onChange={(e) => setWhatIsIt(e.target.value)}
              className="form-control mb-2"
              placeholder={"Enter what is it"}
              cols="4"
              rows="4"
            ></textarea>

            <label htmlFor="">Issue stats</label>
            <textarea
              value={stat}
              onChange={(e) => setStat(e.target.value)}
              className="form-control mb-2"
              placeholder={"Enter stat"}
              cols="4"
              rows="4"
            ></textarea>

            <label> Issue Image</label>
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

export default AdminEditIssue;
