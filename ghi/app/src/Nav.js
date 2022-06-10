import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Nav(props) {
  const { token } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getMe() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/users/me`;
      const response = await fetch(url, { credentials: 'include' });
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      }
    }
    getMe();
  },[user.id]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          OurSpace
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavLink className="dropdown-item" to="events/new" role="button">Events Form</NavLink>
            <NavLink className="dropdown-item" end to="events" role="button">Events</NavLink>
            { token ?
              <>
                {/* Whatever you want to show when people are logged in */}
                <NavLink className="dropdown-item" to="/logout" role="button">Logout {user.username}</NavLink>

              </>:
              <>
                <NavLink className="dropdown-item" to="/login" role="button">Login</NavLink>
                <NavLink className="dropdown-item" to="/signup" role="button">Signup</NavLink>
              </>
            }
        </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavLink className="dropdown-item" to="jobs" role="button">
              Jobs
            </NavLink>
            <NavLink className="dropdown-item" to="posts" role="button">
              Forum
            </NavLink>
            <NavLink className="dropdown-item" to="posts/new" role="button">
              New Post
            </NavLink>
            <NavLink className="dropdown-item" to="reviews/new" role="button">
              Reviews Form
            </NavLink>
            <NavLink className="dropdown-item" to="reviews" role="button">
              Reviews
              </NavLink>
            <NavLink className="dropdown-item" to="mentorship/new" role="button">
              Mentorship
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
