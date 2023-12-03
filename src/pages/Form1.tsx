import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import './Form1Styles.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addForm1Data } from '../store/formSlice';
import { RootState } from '../store/store';

const schema = yup
  .object({
    firstName: yup
      .string()
      .matches(/^[A-Z][a-zA-Z]*$/, 'Name should start with an uppercase letter')
      .required('Name is required'),
    age: yup
      .number()
      .positive('Age must be a positive number')
      .integer('Age must be an integer')
      .required('Age is required'),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/><,.[\]|`~\-\\]).{8,}$/,
        'Password should contain at least 8 characters with at least one number, one uppercase letter, one lowercase letter, and one special character'
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    gender: yup.string().required('gender is required'),
    file: yup
      .mixed()
      .test('fileSize', 'File size is too large', (value) => {
        return value ? (value as File).size <= 1024 * 1024 : false;
      })
      .test('fileType', 'Invalid file type', (value) => {
        return value
          ? ['image/jpeg', 'image/png'].includes((value as File).type)
          : false;
      }),

    country: yup.string().required('Please select a country'),
    subscribe: yup.boolean().oneOf([true], 'Please accept the T&C'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function Form1() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log(data);
    dispatch(addForm1Data(data));
    navigate('/');
  };
  const fileValue = watch('file');
  const emailValue = watch('email');
  const firstNameValue = watch('firstName');
  const ageValue = watch('age');
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');
  useEffect(() => {
    if (emailValue) {
      trigger('email');
    }
    if (firstNameValue) {
      trigger('firstName');
    }
    if (ageValue) {
      trigger('age');
    }
    if (passwordValue) {
      trigger('password');
    }
    if (confirmPasswordValue) {
      trigger('confirmPassword');
    }
    if (fileValue) {
      trigger('file');
    }
  }, [
    emailValue,
    firstNameValue,
    ageValue,
    passwordValue,
    confirmPasswordValue,
    fileValue,
    trigger,
  ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log('file size:=', file.size);
      setValue('file', file);
    }
  };
  const countries = useSelector((state: RootState) => state.countries);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('firstName')}
          placeholder="Name"
          onChange={() => {
            trigger('firstName');
          }}
        />
        <p>{errors.firstName?.message}</p>
        <input {...register('age')} placeholder="age" />
        <p>{errors.age?.message}</p>
        <input {...register('email')} placeholder="Email" />
        <p>{errors.email?.message}</p>
        <input {...register('password')} placeholder="Password" />
        <p>{errors.password?.message}</p>
        <input
          {...register('confirmPassword')}
          placeholder="Confirm Password"
        />
        <p>{errors.confirmPassword?.message}</p>
        <select {...register('gender')}>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>
        <p>{errors.gender?.message}</p>
        <input type="checkbox" {...register('subscribe')} id="acceptTerms" />
        <label htmlFor="acceptTerms">I accept the Terms & Conditions</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <p>{errors.file?.message}</p>
        <div>
          <label htmlFor="country">Country</label>
          <input
            list="countryList"
            {...register('country')}
            placeholder="Select a country"
          />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country.id} value={country.name} />
            ))}
          </datalist>
        </div>
        <button type="submit" disabled={!isValid}>
          Send
        </button>
      </form>
      <Link to={`/`}>Main</Link>
    </>
  );
}
