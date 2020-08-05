import React from "react";
import { ThemeConsumer } from "../contexts/theme";
import { NavLink } from "react-router-dom";

export default function Nav() {
  const activeStyle = {
    color: "rgb(187, 46, 31)",
  };

  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink
                to="/"
                exact
                activeStyle={activeStyle}
                className="nav-link"
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/battle"
                activeStyle={activeStyle}
                className="nav-link"
              >
                Battle
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                activeStyle={activeStyle}
                className="nav-link"
              >
                Search
              </NavLink>
            </li>
          </ul>
          <button
            style={{ fontSize: 30 }}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🔦" : "💡"}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}
