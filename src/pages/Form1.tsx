import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
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
        <p>firstName</p> <input {...register('firstName')} />
        <p>{errors.firstName?.message}</p>
        <p>age</p>
        <input {...register('age')} />
        <p>{errors.age?.message}</p>
        {/* <input type="submit" /> */}
        <button type="submit">Send</button>
      </form>
      <Link to={`/`}>Main</Link>
    </>
  );
}
