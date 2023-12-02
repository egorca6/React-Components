import { Link } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
  const formDataForm1 = useSelector((state: RootState) => state.form1Data);
  console.log('email', formDataForm1);
  return (
    <>
      <Link to="/form1" className="uncontrolledForm">
        uncontrolled Components
      </Link>
      <Link to="/form2" className="ReactHookForm">
        React Hook Form
      </Link>
      <div className="results-container">
        {formDataForm1.map((data) => (
          <div className="results">
            <p>First Name: {data.firstName}</p>
            <p>Age: {data.age}</p>
            <p>email: {data.email}</p>
            <p>password: {data.password}</p>
            <p>subscribe: {data.subscribe}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
