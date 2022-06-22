import React, { useState } from "react";
import "../home.scss";
import Button from "../../common/button.js";
import Select from "../../common/select";
import { useDispatch } from "react-redux";
import { UpdateInitials } from "../../redux/slice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({
    interest: "",
    type: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const Submit = () => {
    if (data.interest !== "" && data.type !== "") {
      dispatch(UpdateInitials(data));
      navigate("/events");
    } else {
      toast.error("please select all fields");
    }
  };
  return (
    <>
      <div className="app">
        <ToastContainer />

        <div className="home">
          <div className="lefty">
            <div className="logo">TechEventsUK</div>
            <p className="description">
              Discover events that only matched your interest.
            </p>
          </div>
          <div className="righty">
            <form>
              <div>
                <p>
                  Tell us your interest and event type!<br></br>
                  <small>
                    **Our system uses this information to give you exactly what
                    you need**
                  </small>
                </p>
                {/* {JSON.stringify(data)}
                {JSON.stringify(initials)} */}
              </div>
              <div className="forms">
                <Select
                  onchange={(e) =>
                    setData({ ...data, interest: e.target.value })
                  }
                  clas="selecter"
                  defText="Interest"
                  options={[
                    "AI",
                    "Mobile Development",
                    "Robotics",
                    "Web",
                    "Machine Learning",
                  ]}
                />
                <Select
                  onchange={(e) => setData({ ...data, type: e.target.value })}
                  clas="selecter"
                  defText="Event Type"
                  options={["Virtual", "On-Site"]}
                />
                <Button
                  onclick={(e) => {
                    e.preventDefault();
                    Submit();
                  }}
                  clas="buts"
                  name="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
