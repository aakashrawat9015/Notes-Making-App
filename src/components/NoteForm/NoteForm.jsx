import React, { useState } from 'react';
import Button from '../button/Button';


const NoteForm = ({addNote}) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title.trim() == "" || content.trim()=="" )
      return;

    addNote({title, content});
    setTitle("");
    setContent("");
  }
  return (

    
      <div className="max-w-xl w-full p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Create a Note</h2>

        <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
            className="bg-gray-700 text-white border border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Note Content"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button label="Add Note" type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer' />
        </form>
    </div>
  );
};

export default NoteForm;