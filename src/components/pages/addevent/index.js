import React, { useState } from "react";
import "../home.scss";
import Input from "../../common/input";
import Button from "../../common/button.js/index.js";
import Select from "../../common/select";
import instance from "../../axiosBase";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
const AddEvent = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    isVirtual: "",
    address: "Virtual ",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  const Submit = async () => {
    setLoading(true);
    try {
      if (
        data.title !== "" &&
        data.description !== "" &&
        data.category !== "" &&
        data.date !== "" &&
        data.isVirtual !== "" &&
        data.time !== ""
      ) {
        let res = await instance.post("/event/create-event", data);
        let result = await res.data;
        if (result.status === "success") {
          setLoading(false);

          toast.success("Event created");
        } else {
          setLoading(false);

          toast.error(result.message);
          toast.error(JSON.stringify(result.data[0]).replaceAll(/^[{}]/g, ""));
        }
      } else {
        setLoading(false);

        toast.error("All fields must be filled");
      }
    } catch (e) {
      setLoading(false);

      toast.error(e.response.data.message);
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
                  Create Event<br></br>
                </p>
                {/* {JSON.stringify(data)} */}
              </div>
              <div className="forms">
                <Input
                  clas="texter"
                  type="text"
                  name="title"
                  holder="Title"
                  onchange={(e) => setData({ ...data, title: e.target.value })}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
                <Select
                  onchange={(e) =>
                    setData({ ...data, category: e.target.value })
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
                <Input
                  clas="texter"
                  type="date"
                  name="date"
                  holder="Date"
                  onchange={(e) => setData({ ...data, date: e.target.value })}
                />
                <Select
                  onchange={(e) =>
                    setData({
                      ...data,
                      isVirtual: e.target.value === "Virtual" ? true : false,
                    })
                  }
                  clas="selecter"
                  defText="Event Type"
                  options={["Virtual", "On-Site"]}
                />
                {data.isVirtual === true ? (
                  ""
                ) : (
                  <textarea
                    name="location"
                    placeholder="Location i.e Address"
                    onChange={(e) =>
                      setData({ ...data, address: e.target.value })
                    }
                  />
                )}
                <Input
                  clas="texter"
                  type="time"
                  name="time"
                  holder="time"
                  onchange={(e) => setData({ ...data, time: e.target.value })}
                />

                <Button
                  onclick={(e) => {
                    e.preventDefault();
                    Submit();
                  }}
                  disabled={loading}
                  clas="buts"
                  name={!loading ? "Create Event" : "Loading"}
                />
              </div>
              <div>
                <p className="confis">
                  Go back? <NavLink to="/login">Login</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddEvent;
