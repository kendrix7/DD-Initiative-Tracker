$('#battleColumn').droppable({
    accept: '.card',
    tolerance: 'touch',
    drop: function(event, ui) {
      ui.draggable.remove();
  }
});