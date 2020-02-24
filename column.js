const Column = {
   idCounter: 4,
   dragged: null,

   process (columnElement) {
     const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

     spanAction_addNote.addEventListener('click', event => {

       const noteElement = Note.create();
       
       columnElement.querySelector('[data-notes]').append(noteElement);

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

     columnElement.addEventListener('dragstart', Column.dragstart);
     columnElement.addEventListener('dragend', Column.dragend);

     columnElement.addEventListener('dragenter', Column.dragenter);
     columnElement.addEventListener('dragover', Column.dragover);
     columnElement.addEventListener('dragleave', Column.dragleave);

     columnElement.addEventListener('drop', Column.drop);

   },

   dragstart (event) {
      Column.dragged = this;
      Column.dragged.classList.add('dragged');
      
      document
      .querySelectorAll('.note')
      .forEach(noteElement => noteElement.removeAttribute('draggable'));

      event.stopPropagation();
   },
   
   dragenter(event) {
       if (!Column.dragged || this === Column.dragged) return;

       this.classList.add('under');
       console.log(event);
     },

   dragover(event) {
      event.preventDefault();
      if (!Column.dragged || this === Column.dragged) return;
      console.log(event);

      event.stopPropagation();
   },

   dragleave(event) {
      if (!Column.dragged || this === Column.dragged) return;

      this.classList.remove('under');
      console.log(event);
   },

   dragend(event) {
      Column.dragged.classList.remove('dragged');
      Column.dragged = null;

      document
        .querySelectorAll('.note')
        .forEach(noteElement => noteElement.setAttribute('draggable', true));

   },

   drop() {
     if (Note.dragged) {
       return this.querySelector('[data-notes]').append(Note.dragged);
       
     } else if (Column.dragged) {
        console.log('drop Column');
     }
   },


}