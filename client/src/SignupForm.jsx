import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignupForm() {
  const [apiResponse, setApiResponse] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        setApiResponse(resData);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="m-4 p-4">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded"
        >
          <label htmlFor="usernamesignup" className="font-bold">
            Username
          </label>
          <input
            name="usernamesignup"
            id="usernamesignup"
            type="text"
            placeholder="Username"
            maxLength="20"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must be no more than 20 characters',
              },
              pattern: {
                value: /^[a-zA-Z]\w+$/,
                message:
                  'Username must start with a letter and contain only letters, numbers, and underscores',
              },
            })}
            className="border border-solid border-gray-300 rounded"
          />
          <span>{errors.username && errors.username.message}</span>
          <label htmlFor="passwordsignup" className="font-bold">
            Password
          </label>
          <input
            name="passwordsignup"
            id="passwordsignup"
            type="password"
            placeholder="Password"
            maxLength="20"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 3,
                message: 'Password must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Password must be no more than 20 characters',
              },
            })}
            className="border border-solid border-gray-300 rounded"
          />
          <span> {errors.password && errors.password.message}</span>
          <input
            type="submit"
            value="Sign Up"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </form>
        <h1 className="text-xl font-bold">Register Response JSON</h1>
        <p>{JSON.stringify(apiResponse)}</p>
      </div>
    </>
  );
}
