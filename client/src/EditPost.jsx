import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from './App';

export default function EditPost({ postHref }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(true);

  const user = useContext(UserContext);
  const secret_token = JSON.parse(localStorage.getItem('jwtblog')).token;

  const [post, setPost] = useState(async () => {
    setIsPostLoading(true);
    await fetch(postHref, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + secret_token,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setPost(resData);
        setIsPostLoading(false);
        console.log(resData);

        return;
      })
      .catch((err) => console.error(err));
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await fetch(postHref, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer ' + secret_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        text: data.text,
        draft: data.isDraft,
        purpose: 'edit',
      }),
    })
    .then((res) => res.json())
    .then((resData) => {
      console.log(JSON.stringify(resData));
      setIsSubmitting(false);
      setIsSubmitted(true);
    })
    .catch((err) => console.error(err));
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
        defaultValue={post.title}
        {...register('title', {
          required: 'Title is required',
          minLength: {
            value: 3,
            message: 'Title must be at least 3 characters',
          },
        })}
        className="border"
      />
      <label htmlFor="text">Content</label>
      <textarea
        name="text"
        id="text"
        defaultValue={post.text}
        placeholder='Write your blog post here...'
        {...register('text', {
          required: 'Content is required',
        })}
        className="border"
      ></textarea>
      <label htmlFor="draft">Mark as Draft</label>
      <input
        type="checkbox"
        name="draft"
        id="draft"
        {...register('isDraft')}
        defaultChecked={post.draft}
        className="border"
      />
      <span> {errors.title && errors.title.message}</span>
      <span> {errors.text && errors.text.message}</span>
      <input
        type="submit"
        value="Save Edits"
      />
    </form>
  )

  if (isPostLoading) {
    return <p>Loading post...</p>;
  } else if (isSubmitting) {
    return <p>Submitting post...</p>;
  } else if (isSubmitted) {
    return <p>Post submitted!</p>;
  } else {
    return <div>{submissionForm}</div>;
  }
}
