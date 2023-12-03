import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addForm1Data } from '../store/formSlice';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import './Form2Styles.css';

const Form = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countries);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleValidation = (formData: FormData) => {
    const firstName = formData.get('firstName') as string;
    const email = formData.get('email') as string;
    const age = formData.get('age') as string;
    const errorsObj: { [key: string]: string } = {};

    if (!/^[A-Z]/.test(firstName)) {
      errorsObj.firstName =
        'Please enter a firstName starting with an uppercase letter.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorsObj.email = 'Please enter a valid email address.';
    }

    if (isNaN(Number(age)) || Number(age) < 0) {
      errorsObj.age = 'Please enter a valid non-negative number for age.';
    }
    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const file = fileInputRef.current?.files?.[0];
    const isFormValid = handleValidation(formData);
    if (isFormValid) {
      const dataToAdd = {
        firstName: formData.get('firstName'),
        gender: formData.get('gender'),
        age: formData.get('age'),
        email: formData.get('email'),
        password: formData.get('password'),
        country: formData.get('country'),
        file: file,
        isNew: true,
      };
      dispatch(addForm1Data(dataToAdd));
      navigate('/');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="firstName" placeholder="firstName" />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div>
          <select name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <input type="number" name="age" placeholder="age" />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>
        <div>
          <input type="email" name="email" placeholder="email" />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <div>
          <label htmlFor="country"></label>
          <input
            list="countryList"
            name="country"
            placeholder="Select a country"
          />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country.id} value={country.name} />
            ))}
          </datalist>
        </div>
        <input type="checkbox" id="acceptTerms" />
        <label htmlFor="acceptTerms">I accept the Terms & Conditions</label>
        <div>
          <input type="file" name="file" ref={fileInputRef} accept="image/*" />
        </div>
        <button type="submit">Send</button>
      </form>
      <Link to={`/`}>Main</Link>
    </>
  );
};

export default Form;
