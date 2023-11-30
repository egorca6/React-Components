import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Link to="/form1" className="uncontrolledForm">
        uncontrolled Components
      </Link>
      <Link to="/form2" className="ReactHookForm">
        React Hook Form
      </Link>
    </>
  );
}

export default App;
