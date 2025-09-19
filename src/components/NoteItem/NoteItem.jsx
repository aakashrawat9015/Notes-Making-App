import React, { useState } from "react";
import Button from "../button/Button";

const NoteItem = ({ note, onDelete, onUpdate }) => {
  const { $id, title, content } = note;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onUpdate($id, {
      title: editedTitle,
      content: editedContent,
    });
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-300 rounded p-4 mb-4 shadow-sm bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-lg font-semibold bg-gray-800 text-white px-2 py-1 rounded w-full"
          />
        ) : (
          <h2 className="text-lg font-semibold">{title}</h2>
        )}

        <div className="flex gap-2">
          {isEditing ? (
            <Button
              onClick={handleSave}
              label="Save"
              className="px-4 py-2 rounded-full hover:bg-green-500 transition-colors duration-200"
              type="button"
            />
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              label="Edit"
              className="px-4 py-2 rounded-full hover:bg-blue-500 transition-colors duration-200"
              type="button"
            />
          )}

          <Button
            onClick={() => onDelete($id)}
            label="Delete"
            className="px-4 py-2 rounded-full hover:bg-red-500 transition-colors duration-200"
            type="button"
          />
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded mt-2"
        />
      ) : (
        <p className="text-gray-300 whitespace-pre-line">{content}</p>
      )}
    </div>
  );
};

export default NoteItem;