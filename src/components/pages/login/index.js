import React, { useState } from "react";
import "../home.scss";
import Input from "../../common/input";
import Button from "../../common/button.js/index.js";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import instance from "../../axiosBase";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const Submit = async () => {
    setLoading(true);
    try {
      if (data.email !== "" && data.password !== "") {
        let res = await instance.post("/user/login", data);
        let result = await res.data;
        if (result.status === "success") {
          setLoading(false);

          localStorage.setItem(
            "FigToken",
            JSON.stringify(result.data.accessToken)
          );
          toast.success("signin successfully");
          navigate("/index");
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
                  Welcome back<br></br>
                  <small>**Discover events tailored to your interest**</small>
                </p>
                {/* {JSON.stringify(data)}
                {JSON.stringify(count)} */}
              </div>
              <div className="forms">
                <Input
                  clas="texter"
                  type="text"
                  name="email"
                  holder="Enter Email Address"
                  onchange={(e) => setData({ ...data, email: e.target.value })}
                />

                <Input
                  clas="texter"
                  type="password"
                  name="password"
                  holder="Enter Password"
                  onchange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required={true}
                />

                <Button
                  onclick={(e) => {
                    e.preventDefault();
                    Submit();
                  }}
                  disabled={loading}
                  clas="buts"
                  name={!loading ? "Login" : "Loading"}
                />
              </div>
              <div>
                <p className="confis">
                  Don`t have and account?{" "}
                  <NavLink to="/signup">Sign up</NavLink>
                </p>
              </div>
              <div>
                <p className="confis">
                  Add new event <NavLink to="/addevent">New event</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
