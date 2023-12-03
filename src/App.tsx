import { Link } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
  const formDataForm1 = useSelector((state: RootState) => state.form1Data);
  console.log('email', formDataForm1);
  return (
    <>
      <Link to="/form2" className="uncontrolledForm">
        uncontrolled Components
      </Link>
      <Link to="/form1" className="ReactHookForm">
        React Hook Form
      </Link>
      <div className="results-container">
        {formDataForm1.map((data) => (
          <div className={data.isNew ? 'newDataStyle' : 'results'}>
            <p>First Name: {data.firstName}</p>
            <p>Gender: {data.gender}</p>
            <p>Age: {data.age}</p>
            <p>email: {data.email}</p>
            <p>password: {data.password}</p>
            <p>country: {data.country}</p>
            <p>
              {data.file && (
                <img
                  src={URL.createObjectURL(data.file)}
                  alt="Uploaded"
                  width={100}
                  height={100}
                />
              )}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
