import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { StatusContext } from './App';
import { Status } from './constants/status';

export default function LoginForm({ toggleUser }) {
  const [apiResponse, setApiResponse] = useState({});

  const { register, handleSubmit } = useForm({ mode: 'onBlur' });

  const status = useContext(StatusContext);

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
        status.setStatus(Status.USER_HOME);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="usernamelogin">
            Username
          </label>
          <input
            name="usernamelogin"
            id="usernamelogin"
            type="text"
            placeholder="Username"
            maxLength="20"
            {...register('username')}
          />
          <label htmlFor="passwordlogin">
            Password
          </label>
          <input
            name="passwordlogin"
            id="passwordlogin"
            type="password"
            placeholder="Password"
            maxLength="20"
            {...register('password')}
          />
          <input
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </>
  );
}
