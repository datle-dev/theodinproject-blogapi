import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { PostContext } from './App';

export default function CommentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user, post } = useContext(PostContext);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    fetch(post + '/comments', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user,
        text: data.text,
        date: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(JSON.stringify(resData));
        setIsSubmitting(false);
        setIsSubmitted(true);
      })
      .catch((err) => console.error(err));
    console.log({
      username: user,
      text: data.text,
      date: new Date(),
    })
    console.log(post);
  };
  
  const submissionForm = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded"
    >
      <label htmlFor="text">Comment</label>
      <textarea
        name="text"
        id="text"
        placeholder='Write your comment here...'
        {...register('text', {
          required: 'Comment is required',
        })}
        className="border"
      ></textarea>
      <span> {errors.text && errors.text.message}</span>
      <input
        type="submit"
        value="Submit Comment"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      />
    </form>
  )

  if (isSubmitting) {
    return <p>Loading...</p>;
  } else if (isSubmitted) {
    return <p>Submitted!</p>;
  } else {
    return (
      <>
        <div>
          {submissionForm}
        </div>
      </>
    );
  }
};

