import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm/NoteForm'
import { databases, ID, DATABASE_ID, TABLE_ID } from '../appwrite.js'
import NoteItem from './components/NoteItem/NoteItem'
import { Toaster, toast } from 'react-hot-toast'

function App() {
  // create a array of all notes for UI
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);


  // accepts the single note passed in the forms input 
  const addNote = async (note) => {
    try {
      const newNote = await databases.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        note
      )
      setNotes((prev) => [newNote, ...prev])
      toast.success("Note added successfully!")

    } catch (error) {
      // console.error("Error creating note:", error.message);
      toast.error("Failed to add note.")
    }
  }

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await databases.listDocuments(DATABASE_ID, TABLE_ID);
      setNotes(res.documents)
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  const deleteNote = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, TABLE_ID, id);
      setNotes((prev) => prev.filter((note) => note.$id !== id))
      toast.success("Note deleted successfully!")
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  }

  const updateNote = async (id, updatedData) => {
    try {
      const updatedNote = await databases.updateDocument(
        DATABASE_ID,
        TABLE_ID,
        id,
        updatedData
      )
      setNotes((prev) =>
        prev.map((note) => (note.$id === id ? updatedNote : note)));
      toast.success("Note updated successfully!")

    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  }

  return (
    <>
      <Toaster position='top-right' />
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 pt-16 px-4">
        <NoteForm addNote={addNote} />

        <div className="mt-1 w-full max-w-xl space-y-4 ">
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              <span className="ml-3 text-white">Loading notes...</span>
            </div>
          )}
          {notes.map((note) => (
            <NoteItem
              key={note.$id}
              note={note}
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          ))}
        </div>


      </div>

    </>
  )
}

export default App



