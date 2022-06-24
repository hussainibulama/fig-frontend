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
    file: "",
  });
  const [time, setTime] = useState({
    stime: "",
    etime: "",
    si: "",
    ei: "",
    tz: "",
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
        data.isVirtual !== ""
      ) {
        const formData = new FormData();

        formData.append("file", data.file);

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("date", data.date);
        formData.append("address", data.address);
        formData.append("isVirtual", data.isVirtual);
        formData.append(
          "time",
          time.stime +
            "" +
            time.si +
            "-" +
            time.etime +
            "" +
            time.ei +
            " " +
            time.tz
        );

        let res = await instance.post("/event/create-event", formData, {
          headers: {
            "Content-Type": `multipart/form-data;`,
          },
        });
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
                <span>Title:</span>
                <Input
                  clas="texter"
                  type="text"
                  name="title"
                  holder="Title"
                  onchange={(e) => setData({ ...data, title: e.target.value })}
                />
                <span>Description:</span>
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
                <span>Category:</span>

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
                <span>Date:</span>

                <Input
                  clas="texter"
                  type="date"
                  name="date"
                  holder="Date"
                  onchange={(e) => setData({ ...data, date: e.target.value })}
                />
                <span>Type:</span>
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

                <textarea
                  name="location"
                  placeholder={
                    data.isVirtual === true
                      ? "Meeting  Link"
                      : "Location i.e Address"
                  }
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                />

                <div className="all">
                  <div>
                    {" "}
                    <span>Start Time:</span>
                    <Input
                      clas="texter"
                      type="time"
                      name="time"
                      holder="time"
                      onchange={(e) =>
                        setTime({ ...time, stime: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <span>Indicator:</span>

                    <Select
                      onchange={(e) => setTime({ ...time, si: e.target.value })}
                      clas="selecter"
                      defText="Clock"
                      options={["AM", "PM"]}
                    />
                  </div>
                  <div>
                    <span>End Time:</span>

                    <Input
                      clas="texter"
                      type="time"
                      name="time"
                      holder="time"
                      onchange={(e) =>
                        setTime({ ...time, etime: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <span>Indicator:</span>

                    <Select
                      onchange={(e) => setTime({ ...time, ei: e.target.value })}
                      clas="selecter"
                      defText="Clock"
                      options={["AM", "PM"]}
                    />
                  </div>
                  <div>
                    {" "}
                    <span>Time Zome:</span>
                    <Input
                      clas="texter"
                      type="text"
                      name="time"
                      holder="GMT+1"
                      onchange={(e) => setTime({ ...time, tz: e.target.value })}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <span>Image:</span>
                  <input
                    type="file"
                    onChange={(e) =>
                      setData({ ...data, file: e.target.files[0] })
                    }
                  />
                </div>

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
