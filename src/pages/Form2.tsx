import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import './Form1Styles.css';

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
    subscribe: yup.boolean().oneOf([true], 'Please accept the T&C'),
    country: yup.string().required('Please select a country'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function Form1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = (data: FormData) => {
    console.log(data);
    navigate('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Name</p> <input {...register('firstName')} />
        <p>{errors.firstName?.message}</p>
        <p>Аge</p>
        <input {...register('age')} />
        <p>{errors.age?.message}</p>
        <p>Email</p>
        <input {...register('age')} />
        <p>{errors.age?.message}</p>
        <p>Password</p>
        <input {...register('age')} />
        <p>{errors.age?.message}</p>
        <p>Confirm Password</p>
        <input {...register('age')} />
        <p>{errors.age?.message}</p>
        <select>
          <option value="Man" {...register('firstName')}>
            Man
          </option>
          <option value="Woman">Woman</option>
        </select>
        <input type="checkbox" id="subscribeNews" />
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
