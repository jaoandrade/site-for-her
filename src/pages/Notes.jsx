import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import './Notes.css'

const Notes = ({ onBack }) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = async () => {
    if (!supabase) {
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setNotes(data || [])
    } catch (error) {
      console.error('Error loading notes:', error)
    } finally {
      setLoading(false)
    }
  }

  const addNote = async () => {
    if (!newNote.trim() || !supabase) return

    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ text: newNote }])
        .select()

      if (error) throw error

      setNotes([data[0], ...notes])
      setNewNote('')
    } catch (error) {
      console.error('Error adding note:', error)
      alert('Failed to add note. Please try again.')
    }
  }

  const deleteNote = async (id) => {
    if (!supabase) return

    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)

      if (error) throw error

      setNotes(notes.filter(note => note.id !== id))
    } catch (error) {
      console.error('Error deleting note:', error)
      alert('Failed to delete note. Please try again.')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="notes-page">
      <div className="notes-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1 className="notes-title">💌 Love Notes 💌</h1>
      </div>

      <div className="notes-content">
        {!supabase && (
          <div className="supabase-warning">
            <p>⚠️ Supabase not configured. Notes will not be saved.</p>
            <p>Please configure Supabase in your .env.local file.</p>
          </div>
        )}

        <div className="notes-container">
          {loading ? (
            <div className="loading">Loading notes... ✨</div>
          ) : notes.length === 0 ? (
            <div className="empty-notes">
              <p>No notes yet! 📝</p>
              <p>Write your first love note below 💕</p>
            </div>
          ) : (
            notes.map(note => (
              <div key={note.id} className="note-card">
                <p className="note-text">{note.text}</p>
                <div className="note-footer">
                  <span className="note-date">{formatDate(note.created_at)}</span>
                  <button 
                    className="delete-note-button"
                    onClick={() => deleteNote(note.id)}
                    aria-label="Delete note"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="add-note-form">
          <textarea
            className="note-input"
            placeholder="Write a love note... 💕"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows="3"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                addNote()
              }
            }}
          />
          <button className="add-note-button" onClick={addNote} disabled={!newNote.trim()}>
            Add Note ✨
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notes
