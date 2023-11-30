import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}
export default function Form2() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    navigate('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName', { required: true, maxLength: 5 })} />
        <input {...register('lastName', { pattern: /^[A-Za-z]+$/i })} />
        <input type="number" {...register('age', { min: 2, max: 70 })} />
        {/* <input type="submit" /> */}
        <button type="submit">Send</button>
      </form>
      <Link to={`/`}>Main</Link>
    </>
  );
}
