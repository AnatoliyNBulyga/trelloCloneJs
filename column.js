class Column {

  constructor(id = null, title = 'в плане') {

    const instance = this;

    this.notes = [];

    const element = this.element = document.createElement('div');
    element.classList.add('column');
    element.setAttribute('draggable', 'true');

    if (id) {
      element.setAttribute('data-column-id', id);

    } else {
      element.setAttribute('data-column-id', Column.idCounter);
      Column.idCounter++;
    }

    element.innerHTML = `
      <p class="column-header">${title}</p>
          <div data-notes></div>
      <p class="column-footer"><span data-action-addNote class="action">+Добавить карточку</span></p>`

    const spanAction_addNote = element.querySelector('[data-action-addNote]');

    spanAction_addNote.addEventListener('click', event => {

      const note = new Note;

      instance.add(note.element);
      note.element.setAttribute('contenteditable', true);
      note.element.focus();

    });

    const headerElement = element.querySelector('.column-header');

      headerElement.addEventListener('dblclick', event => {
        headerElement.setAttribute('contenteditable', true);
        headerElement.focus();
      });

      headerElement.addEventListener('blur', event => {
        headerElement.removeAttribute('contenteditable');
        Application.save();

      });

      element.addEventListener('dragstart', this.dragstart.bind(this));
      element.addEventListener('dragend', this.dragend.bind(this));

      element.addEventListener('dragover', this.dragover.bind(this));

      element.addEventListener('drop', this.drop.bind(this));

  }

  add(...notes) {

    for (const note of notes) {
      if(!this.notes.includes(note)) {
        this.notes.push(note);
        this.element.querySelector('[data-notes]').append(note);
      }  
    }
  }

  dragstart(event) {
    Column.dragged = this.element;
    Column.dragged.classList.add('dragged');

    document
      .querySelectorAll('.note')
      .forEach(noteElement => noteElement.removeAttribute('draggable'));

    event.stopPropagation();
  }

  dragover(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!Column.dragged || this.element === Column.dragged) return;

    document
      .querySelectorAll('.column')
      .forEach(element => element.classList.remove('under'));

    this.element.classList.add('under');
  }

  dragend(event) {
    Column.dragged.classList.remove('dragged');
    Column.dragged = null;

    document
      .querySelectorAll('.note')
      .forEach(noteElement => noteElement.setAttribute('draggable', true));

    document
      .querySelectorAll('.column')
      .forEach(element => element.classList.remove('under'));

    Application.save();
  }

  drop() {
    if (Note.dragged) {
      return this.element.querySelector('[data-notes]').append(Note.dragged);

    } else if (Column.dragged) {
      const children = Array.from(document.querySelector('.columns').children);
      const indexA = children.indexOf(this.element);
      const indexB = children.indexOf(Column.dragged);
      if (indexA < indexB) {
        document.querySelector('.columns').insertBefore(Column.dragged, this.element);
      } else {
        document.querySelector('.columns').insertBefore(Column.dragged, this.element.nextElementSibling);
      }
      document
        .querySelectorAll('.column')
        .forEach(element => element.classList.remove('under'));

    }
  }

}

Column.idCounter = 4;
Column.dragged = null;
