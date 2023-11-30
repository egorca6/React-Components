import { SubmitHandler, useForm } from 'react-hook-form';
import './App.css';
import Form1 from './components/testForm';
interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}
function App() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <>
      <h1>Vite + React</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName', { required: true, maxLength: 5 })} />
        <input {...register('lastName', { pattern: /^[A-Za-z]+$/i })} />
        <input type="number" {...register('age', { min: 2, max: 7 })} />
        <input type="submit" />
      </form>
      <Form1 />
    </>
  );
}

export default App;
