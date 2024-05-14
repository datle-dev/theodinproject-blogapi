import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from './App';

export default function CreatePost() {
  const { register, handleSubmit } = useForm();
  const user = useContext(UserContext);

  const onSubmit = async (data) => {
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

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded"
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Blog post title"
          {...register('title')}
          className="border"
        />
        <textarea
          placeholder='Write your blog post here...'
          {...register('text')}
          className="border"
        ></textarea>
        <label htmlFor="draft">Mark as Draft</label>
        <input
          type="checkbox"
          name="draft"
          id="draft"
          {...register('isDraft')}
        />
        <input
          type="submit"
          value="Submit Post"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </>
  );
}
