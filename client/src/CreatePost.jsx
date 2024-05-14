import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from './App';

export default function CreatePost() {
  const { register, handleSubmit } = useForm();
  const user = useContext(UserContext);

  const onSubmit = async (data) => {
    console.log({
      username: user,
      title: 'title',
      text: data.text,
      comments: [],
      date: new Date(),
      draft: true,
    })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded"
      >
        <textarea
          placeholder='Write your blog post here...'
          {...register('text')}
        ></textarea>
        <input
          type="submit"
          value="Submit Post"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </>
  );
}
