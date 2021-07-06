import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function NavbarOptions() {
  const { userData } = useContext(UserContext);

  return (
    <span>
      {userData.user ? (
        <span>
          {userData.user.role === "admin" ? (
            <span>
              <NavLink to="/admin" className="nav-item" exact>
                VIDEO
              </NavLink>
              <NavLink to="/admin/audio" className="nav-item" exact>
                AUDIO
              </NavLink>
            </span>
          ) : (
            <span>
              <NavLink to="/" className="nav-item" exact>
                VIDEO
              </NavLink>
              <NavLink to="/audio" className="nav-item" exact>
                AUDIO
              </NavLink>
            </span>
          )}
        </span>
      ) : (
        <span>
          <NavLink to="/" className="nav-item" exact>
            VIDEO
          </NavLink>
          <NavLink to="/audio" className="nav-item" exact>
            AUDIO
          </NavLink>
        </span>
      )}
    </span>
  );
}
