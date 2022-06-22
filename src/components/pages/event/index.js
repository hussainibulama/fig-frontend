import React, { useState, useEffect } from "react";
import "./event.scss";
import Button from "../../common/button.js";
import instance from "../../axiosBase";
import { useSelector } from "react-redux";
import { InitialValues } from "../../redux/slice";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const Event = () => {
  const [items, setItems] = useState([]);
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
      fetchData().catch(console.error);
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
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <>
      <div className="app">
        <ToastContainer />

        <div className="events">
          <div className="logo">TechEventsUK</div>
          <div className="ev-list">
            {items.map((item, key) => (
              <div key={key} className="ev-item">
                <div>
                  <h1>{item.title}</h1>
                  <p>Description: {item.description}</p>
                </div>
                <div>
                  <div>Category: {item.category}</div>
                  <div>DateTime: {moment(item.date).format("LL")}, 10:00am</div>
                </div>
                <div>
                  <div>
                    Location:{" "}
                    {item.isVirtual === false ? item.address : "Virtual"}
                  </div>
                  <div>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Event;
