import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm({ toggleUser }) {
  const [apiResponse, setApiResponse] = useState({});

  const { register, handleSubmit } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    fetch('http://localhost:3000/login', {
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
        localStorage.setItem('jwtblog', JSON.stringify(resData));
        toggleUser(resData.username);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="m-4 p-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded"
        >
          <label htmlFor="usernamelogin" className="font-bold">
            Username
          </label>
          <input
            name="usernamelogin"
            id="usernamelogin"
            type="text"
            placeholder="Username"
            maxLength="20"
            {...register('username')}
            className="border border-solid border-gray-300 rounded"
          />
          <label htmlFor="passwordlogin" className="font-bold">
            Password
          </label>
          <input
            name="passwordlogin"
            id="passwordlogin"
            type="password"
            placeholder="Password"
            maxLength="20"
            {...register('password')}
            className="border border-solid border-gray-300 rounded"
          />
          <input
            type="submit"
            value="Login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </form>
        <h1 className="text-xl font-bold">Login Response JSON</h1>
        <p>{JSON.stringify(apiResponse)}</p>
      </div>
    </>
  );
}
