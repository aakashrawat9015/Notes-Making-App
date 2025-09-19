import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm/NoteForm'
import { databases, ID, DATABASE_ID, TABLE_ID } from '../appwrite.js'
import NoteItem from './components/NoteItem/NoteItem'

function App() {
  // create a array of all notes for UI
  const [notes, setNotes] = useState([]);

  // accepts the single note passed in form
  const addNote = async (note) => {

    try {
      const newNote = await databases.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        note
      )
      setNotes((prev) => [newNote, ...prev])

    } catch (error) {
      console.error("Error creating note:", error.message);
    }
  }

  const fetchNotes = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, TABLE_ID);
      setNotes(res.documents)
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  const deleteNote = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, TABLE_ID, id);
      setNotes((prev) => prev.filter((note) => note.$id !== id))
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  }

  // const updateNote = async (id,)

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 pt-16 px-4">
        <NoteForm addNote={addNote} />

        <div className="mt-1 w-full max-w-xl space-y-4 ">
          {notes.map((note) => (
            <NoteItem key={note.$id} note={note} onDelete={deleteNote} />
          ))}
        </div>


      </div>

    </>
  )
}

export default App



