import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { createNote, deleteNote, updateNote } from './graphql/mutations';
import { listNotes } from './graphql/queries';
import { onCreateNote, onUpdateNote, onDeleteNote } from './graphql/subscriptions';

class App extends Component {
  state = {
    id: "",
    note: "",
    notes: []
  };

  componentDidMount() {
    this.getNotes();

    this.createNoteListener = API.graphql(graphqlOperation(onCreateNote)).subscribe({
      next: noteData => {
        const newNote = noteData.value.data.onCreateNote
        const prevNotes = this.state.notes.filter(note => note.id !== newNote.id) 
        const updatedNotes = [...prevNotes, newNote];
        this.setState({ notes: updatedNotes});
      }
    });

    this.deleteNoteListener = API.graphql(graphqlOperation(onDeleteNote)).subscribe({
      next: noteData => {
        const deletedNote = noteData.value.data.onDeleteNote;
        const updatedNotes = this.state.notes.filter(note=>note.id !== deletedNote.id);
        this.setState({ notes: updatedNotes});
      }
    });

    this.updateNoteListener = API.graphql(graphqlOperation(onUpdateNote)).subscribe({
      next: noteData => {
        const updatedNote = noteData.value.data.onUpdateNote;
        const notes = this.state.notes;
        const index = notes.findIndex(note=>note.id === updatedNote.id);
        const updatedNotes = [
          ...notes.slice(0,index),
          updatedNote,
          ...notes.slice(index+1)
        ]
        this.setState({ notes: updatedNotes });
      }
    });
  }

  componentWillUnmount() {
    this.createNoteListener.unsubscribe();
    this.deleteNoteListener.unsubscribe();
    this.updateNoteListener.unsubscribe();
  }

  getNotes = async () => {
    const results = await API.graphql(graphqlOperation(listNotes))
    this.setState({notes: results.data.listNotes.items});
  }

  handleChangeNote =  event => { this.setState({ note: event.target.value })} 

  hasExistingNote = () => {
    const { notes, id } = this.state;
    if (id) {
      const isNote = notes.findIndex(note => note.id === id) > -1;
      return isNote;
    }
    return false;
  }

  handleAddNote = async event => { 
    event.preventDefault() 
    if (this.hasExistingNote()) {
      this.handleUpdateNote();
    } else {
      const { note } = this.state;
      const input = { note };
      await API.graphql(graphqlOperation(createNote, { input }));
      this.setState({note: ""});
    }
  }

  handleUpdateNote = async () => {
    const { id, note } = this.state;
    const input = { id, note };
    await API.graphql(graphqlOperation(updateNote,{ input }));
    this.setState({ note: "", id: ""});
  }

  handleDeleteNote = async noteId => {
    const input = { id: noteId }
    await API.graphql(graphqlOperation(deleteNote, { input }));
  }

  handleSetNote = ({note, id }) => this.setState({note, id});

  render() {
    const { id, notes, note } = this.state;
    return (
      <div className="flex flex-column items-center
       justify-center pa3 bg-washed-red">
         <h1 className="code f2-l">Amplify Notetaker</h1>
         <form className="mb3" onSubmit={this.handleAddNote} >
           <input 
            type="text" 
            className="pa2 f4" 
            placeholder="Write your note" 
            onChange={this.handleChangeNote} value={note} />
           <button 
            className="pa2 f4" 
            type="submit">{id? "Update Note" : "Add Note"}</button>
         </form>
         <div>
          {notes.map(item=>(
            <div key={item.id} className="flex items-center">
              <li className="list pa1 f3" onClick={()=>this.handleSetNote(item)}>{item.note}</li>
              <button className="bg-transparent bn f4" onClick={()=>this.handleDeleteNote(item.id)}>
                <span>&times;</span>
              </button>
            </div>
          ))}
         </div>
       </div>
    );
  } 
}

export default withAuthenticator(App,{
  includeGreetings: true
});
