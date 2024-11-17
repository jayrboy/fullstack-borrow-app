import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <span>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </span>
      <div className="navbar-container">
        <button className="nav-button" onClick={() => navigate('/')}>
          Home
        </button>
        <button
          className="nav-button"
          onClick={() => navigate('/transactions')}
        >
          Transactions
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
