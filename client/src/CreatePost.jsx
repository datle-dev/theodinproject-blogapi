import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from './App';

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const user = useContext(UserContext);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user,
        title: 'title',
        text: data.text,
        comments: [],
        date: new Date(),
        draft: data.isDraft,
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
      title: data.title,
      text: data.text,
      comments: [],
      date: new Date(),
      draft: data.isDraft,
    })
  }

  const submissionForm = (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Blog post title"
        {...register('title', {
          required: 'Title is required',
          minLength: {
            value: 3,
            message: 'Title must be at least 3 characters',
          },
        })}
      />
      <label htmlFor="text">Content</label>
      <textarea
        name="text"
        id="text"
        placeholder='Write your blog post here...'
        {...register('text', {
          required: 'Content is required',
        })}
      ></textarea>
      <label htmlFor="draft">Mark as Draft</label>
      <input
        type="checkbox"
        name="draft"
        id="draft"
        {...register('isDraft')}
      />
      <span> {errors.title && errors.title.message}</span>
      <span> {errors.text && errors.text.message}</span>
      <input
        type="submit"
        value="Submit Post"
      />
    </form>
  )

  if (isSubmitting) {
    return <p>Submitting post...</p>;
  } else if (isSubmitted) {
    return <p>Post submitted!</p>;
  } else {
    return <div>{submissionForm}</div>;
  }
}
