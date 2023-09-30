import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RESET_AUTH } from "../Redux/user/ActionTypes";
function Navbar() {
  const { user, auth } = useSelector((el) => {
    return el.auth;
  });

  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: RESET_AUTH });
  };
  return (
    <div className="navbar">
      <div>
        <img
          className="companyLogo"
          src="https://cdn.vectorstock.com/i/preview-1x/05/68/megaphone-label-with-quiz-banner-web-vector-30920568.jpg"
          alt=""
        />
      </div>
      <div className="userNavbar">
        <Link to={"/dashboard"}>
          <img
            style={{ width: "50px" }}
            src="https://img.freepik.com/premium-vector/avatar-flat-icon-human-white-glyph-blue-background_822686-239.jpg"
            alt=""
          />
        </Link>
        {auth ? user.name : ""}
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}

export default Navbar;
