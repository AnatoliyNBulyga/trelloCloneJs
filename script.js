Application.load();

if (!localStorage.getItem('trello')) {
   document
   .querySelectorAll('.column')
   .forEach(Column.process);

   document
      .querySelectorAll('.note')
      .forEach(Note.process);
}
   

document
   .querySelector('[data-action-addColumn]')
   .addEventListener('click', event => {
      const column = new Column;

      document.querySelector('.columns').append(column.element);

      Application.save();

   }); 
   
