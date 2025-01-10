import { Link } from 'react-router-dom'

const NavBar = ({ logOut, user }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/" onClick={logOut}>
                Log out
              </Link>
            </li>
            <p>Welcome, {user.username}</p>
            <Link
              to="/itemList"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {' '}
              View All Items{' '}
            </Link>

            <NavLink
              to="/new"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Add Item
            </NavLink>
          </>
        ) : (
          <>
            <li>
              <Link to="/auth/signin">Signin</Link>
            </li>
            <li>
              <Link to="/auth/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
