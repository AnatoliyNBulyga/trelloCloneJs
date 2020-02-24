const Column = {
   idCounter: 4,

   process(columnElement) {

     const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

     spanAction_addNote.addEventListener('click', event => {
       const noteElement = document.createElement("div");
       noteElement.classList.add('note');
       noteElement.setAttribute('draggable', true);
       noteElement.setAttribute('data-note-id', Note.noteIdCounter);

       Note.noteIdCounter++;
       columnElement.querySelector('[data-notes]').append(noteElement);
       Note.process(noteElement);

       noteElement.setAttribute('contenteditable', true);
       noteElement.focus();
     });

     const headerElement = columnElement.querySelector('.column-header');

     headerElement.addEventListener('dblclick', event => {
       headerElement.setAttribute('contenteditable', true);
       headerElement.focus();
     });

     headerElement.addEventListener('blur', event => {
       headerElement.removeAttribute('contenteditable');
     });

     columnElement.addEventListener('dragover', event => {
       event.preventDefault();
     });

     columnElement.addEventListener('drop', event => {
       if (Note.dragged) {
         return columnElement.querySelector('[data-notes]').append(Note.dragged);
       }
     });

   }



}