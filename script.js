Application.load();

document
   .querySelector('[data-action-addColumn]')
   .addEventListener('click', event => {

      const columnElement = Column.create();
      document.querySelector('.columns').append(columnElement);

   }); 
   
