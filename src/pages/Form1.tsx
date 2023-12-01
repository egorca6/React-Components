import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import './Form1Styles.css';
import React from 'react';

const schema = yup
  .object({
    firstName: yup
      .string()
      .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercase letter')
      .required('Name is required'),
    age: yup
      .number()
      .positive('Age must be a positive number')
      .integer('Age must be an integer')
      .required('Age is required'),
    subscribe: yup.boolean().oneOf([true], 'Please accept the T&C'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password should be at least 6 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    email: yup
      .string()
      .nullable()
      .email('Enter a valid email')
      .required('Email is required'),
    // country: yup.string().required('Please select a country'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function Form1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = (data: FormData) => {
    console.log(data);
    navigate('/');
  };

  const emailValue = watch('email');
  React.useEffect(() => {
    if (emailValue) {
      trigger('email');
    }
  }, [emailValue, trigger]);
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
        <select>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>
        <input type="checkbox" id="subscribeNews" {...register('subscribe')} />
        <label htmlFor="acceptTerms">I accept the Terms & Conditions</label>
        <p>{errors.subscribe?.message}</p>
        <input type="file" />
        {/* <div>
          <label htmlFor="city">City</label>
          <input
            autoComplete="address-level2"
            required
            type="text"
            id="city"
            name="city"
          />
        </div> */}
        <button type="submit">Send</button>
      </form>
      <Link to={`/`}>Main</Link>
    </>
  );
}
