class Note {

   constructor(id = null, content = '') {
      const instance = this;
      const element = this.element = document.createElement("div");

      element.classList.add('note');
      element.setAttribute('draggable', true);
      element.textContent = content;

      if (id) {
        element.setAttribute('data-note-id', id);

      } else {
        element.setAttribute('data-note-id', Note.idCounter);
        Note.idCounter++;
      }

      element.addEventListener('dblclick', event => {
        element.setAttribute('contenteditable', true);
        element.removeAttribute('draggable');
        instance.column.removeAttribute('draggable');

        element.focus();
      });

      element.addEventListener('blur', evetn => {

        element.removeAttribute('contenteditable');
        element.setAttribute('draggable', true);
        instance.column.setAttribute('draggable', true);

        if (!element.textContent.trim().length) {
          element.remove();
          Note.idCounter--;
        }

        Application.save();

      });

      element.addEventListener('dragstart', this.dragstart.bind(this));
      element.addEventListener('dragend', this.dragend.bind(this));
      element.addEventListener('dragenter', this.dragenter.bind(this));
      element.addEventListener('dragover', this.dragover.bind(this));
      element.addEventListener('dragleave', this.dragleave.bind(this));
      element.addEventListener('drop', this.drop.bind(this));

   }

   get column () {
      return this.element.closest('.column');
   }

   dragstart(event) {
      Note.dragged = this.element;
      this.element.classList.add('dragged');
      event.stopPropagation();
   }

   dragend(event) {
      Note.dragged = null;
      this.element.classList.remove('dragged');
      document
      .querySelectorAll('.note')
      .forEach(elem => elem.classList.remove('under'));

      event.stopPropagation();

      Application.save();
   }

   dragenter(event) {
      if (!Note.dragged || this.element.element === Note.dragged) return
      this.element.classList.add('under');

      event.stopPropagation();
   }

   dragover(event) {
      if (!Note.dragged || this.element === Note.dragged) return
      event.preventDefault();
   }

   dragleave(event) {

      if (!Note.dragged || this.element === Note.dragged) return
      this.element.classList.remove('under');

      event.stopPropagation();
   }

   drop(event) {

      if (!Note.dragged || this.element === Note.dragged) return

      if (this.element.parentElement === Note.dragged.parentElement) {
      const note = Array.from(this.element.parentElement.querySelectorAll('.note'));
      const indexA = note.indexOf(this.element);
      const indexB = note.indexOf(Note.dragged);

      indexA < indexB 
         ? this.element.parentElement.insertBefore(Note.dragged, this.element) 
         : this.element.parentElement.insertBefore(Note.dragged, this.element.nextElementSibling);

      } else {
         this.element.parentElement.insertBefore(Note.dragged, this.element);
      }
      event.stopPropagation();
   }

}

Note.idCounter = 8
Note.dragend = null




