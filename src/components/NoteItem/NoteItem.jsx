import React from "react";
import Button from "../button/Button";

const NoteItem = ({ note, onDelete }) => {
  const { $id, title, content } = note;

  return (
    <div className="border border-gray-300 rounded p-4 mb-4 shadow-sm bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button
          onClick={() => onDelete($id)}
          label="Delete"
          className={'px-4 py-2 rounded-full hover:bg-red-500 cursor-pointer transition-colors duration-200'}
          type="button"
        />
      </div>

      <p className="text-gray-300 whitespace-pre-line">{content}</p>
    </div>
  );
};

export default NoteItem;