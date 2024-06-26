import { useState } from 'react';

export default function SecureRoute({ toggleLoading }) {
  const [apiResponse, setApiResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSecureAccess = async () => {
    setIsLoading(true);
    const secret_token = JSON.parse(localStorage.getItem('jwtblog')).token;
    console.log(`token: ${secret_token}`);
    fetch('http://localhost:3000/secure', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + secret_token,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setApiResponse(resData);
        console.log(resData);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="m-4 p-4">
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold">Secure Route Testing</h1>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSecureAccess}
            >
              Access Secure Route
            </button>
            <h2 className="text-xl font-bold">Secure Route Response JSON</h2>
            <p>{JSON.stringify(apiResponse)}</p>
          </div>
        )}
      </div>
    </>
  );
}
