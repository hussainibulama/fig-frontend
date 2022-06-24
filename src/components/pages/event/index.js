import React, { useState, useEffect } from "react";
import "./event.scss";
import Button from "../../common/button.js";
import instance from "../../axiosBase";
import { useSelector } from "react-redux";
import { InitialValues } from "../../redux/slice";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const Event = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [aid, setAid] = useState(0);
  const [bin, setBin] = useState([]);
  const initials = useSelector(InitialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let res = await instance.get(
        `/event/search-event?category=${initials.interest}&isVirtual=${
          initials.type === "Virtual" ? true : false
        }`
      );
      let result = await res.data;

      if (result.status === "success") {
        setItems(result.data);
      }
    };
    return () => {
      fetchData().catch((error) => {
        if (error.response.data.status === "error") {
          toast.error("session expired");
          window.location.href = "/";
        }
      });
    };
  }, [initials.interest, initials.type]);
  const Book = async (id, title, location) => {
    setLoading(true);
    try {
      let res = await instance.post("/bookings/create-book", {
        event_id: id,
        event_title: title,
        event_location: location,
      });
      let result = await res.data;
      if (result.status === "success") {
        toast.success("Booked successfully");
        setLoading(false);
        setBin([...bin, id]);
      }
      if (result.status === "error") {
        toast.error("session expired");
        navigate("/");
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <>
      <div className="app">
        <ToastContainer />

        <div className="events">
          <div className="topper">
            <div className="logo">TechEventsUK</div>
            <div className="logout">
              <NavLink to="/">Logout</NavLink>
            </div>
          </div>

          <div className="ev-list">
            {items.length > 0 ? (
              items.map((item, key) => (
                <div key={key} className="ev-item">
                  <div className="direction">
                    <div className="left">
                      <h1>{item.title}</h1>
                      <h3>
                        {moment(item.date).format("LL")} {item.time}
                      </h3>
                      <h4 style={{ margin: "0", padding: "0" }}>
                        {item.isVirtual === false ? "On-site" : "Virtual"}
                      </h4>
                      <h4>{item.address}</h4>
                    </div>
                    <div className="right">
                      <img src={item.file} alt="event file" />
                      {bin.includes(item._id) === true ? (
                        <Button disabled={true} name="Booked" />
                      ) : (
                        <Button
                          onclick={(e) => {
                            e.preventDefault();
                            Book(item._id, item.title, item.address);
                          }}
                          disabled={loading}
                          name="Book Now"
                        />
                      )}
                    </div>
                  </div>

                  <div className="about">
                    <h1>
                      About Event{" "}
                      {aid === item._id ? (
                        <sup onClick={() => setAid(0)}>Hide</sup>
                      ) : (
                        <sup onClick={() => setAid(item._id)}>View All</sup>
                      )}
                    </h1>
                    {aid === item._id ? <p>{item.description}</p> : ""}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h4>No events availabe for this interest</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Event;
