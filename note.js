const Note = {
   noteIdCounter: 8,
   dragged: null,
   process(noteElement) {
      noteElement.addEventListener('dblclick', event => {
        noteElement.setAttribute('contenteditable', true);
        noteElement.removeAttribute('draggable');
        noteElement.closest('.column').removeAttribute('draggable');

        noteElement.focus();
      });
      noteElement.addEventListener('blur', evetn => {
        noteElement.removeAttribute('contenteditable');
        noteElement.setAttribute('draggable', true);
        noteElement.closest('.column').setAttribute('draggable', true);

        !noteElement.textContent.trim().length && noteElement.remove();
      });

      noteElement.addEventListener('dragstart', Note.dragstart);
      noteElement.addEventListener('dragend', Note.dragend);
      noteElement.addEventListener('dragenter', Note.dragenter);
      noteElement.addEventListener('dragover', Note.dragover);
      noteElement.addEventListener('dragleave', Note.dragleave);
      noteElement.addEventListener('drop', Note.drop);
   },

   create() {
      const noteElement = document.createElement("div");
      noteElement.classList.add('note');
      noteElement.setAttribute('draggable', true);
      noteElement.setAttribute('data-note-id', Note.noteIdCounter);

      Note.noteIdCounter++;
      Note.process(noteElement);

      return noteElement;

   },

   dragstart(event) {
      Note.dragged = this;
      this.classList.add('dragged');
      event.stopPropagation();
   },

   dragend(event) {
      
      Note.dragged = null;
      this.classList.remove('dragged');
      document
      .querySelectorAll('.note')
      .forEach(elem => elem.classList.remove('under')); 

      event.stopPropagation();
    
   },

   dragenter(event) {
      
      if ( !Note.dragged || this === Note.dragged) return
      this.classList.add('under');

      event.stopPropagation();
   },

   dragover(event) { 
      if ( !Note.dragged || this === Note.dragged) return
      event.preventDefault();
   },

   dragleave(event) {
      
      if ( !Note.dragged || this === Note.dragged) return
      this.classList.remove('under');

      event.stopPropagation();
   },

   drop(event) {
      
      if (!Note.dragged || this === Note.dragged) return
      
      if (this.parentElement === Note.dragged.parentElement) {
         const note = Array.from(this.parentElement.querySelectorAll('.note'));
         const indexA = note.indexOf(this);
         const indexB = note.indexOf(Note.dragged);
         
         indexA < indexB ?
         this.parentElement.insertBefore(Note.dragged, this) :
         this.parentElement.insertBefore(Note.dragged, this.nextElementSibling);
         
      } else {
         this.parentElement.insertBefore(Note.dragged, this);
      }
      event.stopPropagation();
   },

}



