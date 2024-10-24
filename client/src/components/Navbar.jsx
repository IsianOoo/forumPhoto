import { Link } from "react-router-dom"
export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="nav__title">Forum Photo</a>
      
        <Link to='/'>Home</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
    </nav>
  )
}
