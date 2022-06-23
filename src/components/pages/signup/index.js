import React, { useState } from "react";
import "../home.scss";
import Input from "../../common/input";
import Button from "../../common/button.js/index.js";
import { NavLink } from "react-router-dom";
import instance from "../../axiosBase";
import { ToastContainer, toast } from "react-toastify";
const Signup = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const Submit = async () => {
    setLoading(true);
    try {
      if (
        data.first_name !== "" &&
        data.last_name !== "" &&
        data.email !== "" &&
        data.password !== ""
      ) {
        let res = await instance.post("/user/register", data);
        let result = await res.data;
        if (result.status === "success") {
          setLoading(false);

          toast.success("Signup successfully, proceed to login");
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
                  Let`s get to know you more!<br></br>
                  <small>**This way we can serve you events you need**</small>
                </p>
                {/* {JSON.stringify(data)}
                {JSON.stringify(count)} */}
              </div>
              <div className="forms">
                <Input
                  clas="texter"
                  type="text"
                  name="fname"
                  holder="First Name"
                  onchange={(e) =>
                    setData({ ...data, first_name: e.target.value })
                  }
                />
                <Input
                  clas="texter"
                  type="text"
                  name="lname"
                  holder="Last Name"
                  onchange={(e) =>
                    setData({ ...data, last_name: e.target.value })
                  }
                />

                <Input
                  clas="texter"
                  type="email"
                  name="email"
                  holder="Email"
                  onchange={(e) => setData({ ...data, email: e.target.value })}
                  required={true}
                />
                <Input
                  clas="texter"
                  type="password"
                  name="password"
                  holder="Password"
                  onchange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <Button
                  onclick={(e) => {
                    e.preventDefault();
                    Submit();
                  }}
                  disabled={loading}
                  clas="buts"
                  name={!loading ? "Sign up" : "Loading"}
                />
              </div>
              <div>
                <p className="confis">
                  Existing user? <NavLink to="/login">Login</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
