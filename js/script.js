// I disclose that i have used the chatgpt to help me with this lab
// class Note contains the properties of the Note 
class Note{
    constructor(noteContent){
        this.noteContent = noteContent; // it is the text for the note to be stored 
        this.createNoteElement();
    }

    // this function is used to create the note element
    createNoteElement(){
        this.textarea = document.createElement('textarea');
        this.textarea.value = this.noteContent;

        this.removeButton = document.createElement('button');
        this.removeButton.textContent = 'Remove';
        this.removeButton.onclick = () => this.removeNote();

        this.noteDiv = document.createElement('div');
        this.noteDiv.className = 'noteDiv';
        this.noteDiv.appendChild(this.textarea);
        this.noteDiv.appendChild(this.removeButton);

        document.getElementById('notesContainer').appendChild(this.noteDiv);
    }

    // this function is used to remove the note
    removeNote(){
        this.noteDiv.remove();
        Note.saveNotes();
    }

    // this function is used to get all the content of the text area and then store it in the array and 
    // then store it in the local storage and updates the time 
    static saveNotes(){
        
        const textareas = document.querySelectorAll('#notesContainer textarea');
        const notes = [];
        textareas.forEach(textarea => notes.push(textarea.value));
        localStorage.setItem('notes', JSON.stringify(notes));
        
        // console.log("notes added to the localstorage");
        Note.updateSavedTime();
 
    }
    static updateSavedTime(){
        document.getElementById('lastSavedTime').textContent = `stored at : ${new Date().toLocaleTimeString()}`;
    }


    //  this function is to load the data from the local storage 
    static loadNotes(){
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const notesContainer = document.getElementById('notesContainer');
        notesContainer.innerHTML = '';
        notes.forEach(noteContent => new Note (noteContent));
    }
}

class NoteReader {

    //  this function is to load the data and only show the textarea having the saved notes
    static loadNotes(){
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const noteContainer = document.getElementById('notesContainer');
        noteContainer.innerHTML = '';
        notes.forEach(noteContent => {
            const textarea = document.createElement('textarea');
            textarea.value = noteContent;
            noteContainer.appendChild(textarea);

        });
    }

    // this function update the retrival time
    
    static updateRetrivalTime(){
        document.getElementById('lastRetrievedTime').textContent = `Update at :${new Date().toLocaleTimeString()}`;
    }

}

if(document.body.contains(document.getElementById('addNote'))){
    document.getElementById('addNote').onclick = () => new Note(' ');
    Note.updateSavedTime();
    setInterval(() => Note.saveNotes(), 2000);
    Note.loadNotes();

}else if(document.body.contains(document.getElementById('lastRetrievedTime'))){
    NoteReader.loadNotes();
    NoteReader.updateRetrivalTime();
    setInterval(() => {
        NoteReader.loadNotes();
        NoteReader.updateRetrivalTime();
    },2000);
}