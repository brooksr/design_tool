export let drag = {
  start: function (e) {
    // Target (this) element is the source node.
    editor.src = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    this.classList.add('dragElem');
  },
  enter: function(){},
  over: function (e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    this.classList.add('over');
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return false;
  },
  leave: function (e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  },
  drop: function (e) {
    // this/e.target is current target element.
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
    // Don't do anything if dropping the same column we're dragging.
    if (editor.src != this) {
      this.parentNode.removeChild(editor.src);
      var dropHTML = e.dataTransfer.getData('text/html');
      this.insertAdjacentHTML('beforebegin',dropHTML);
      var dropElem = this.previousSibling;
      addDnDHandlers(dropElem);

    }
    this.classList.remove('over');
    return false;
  },
  end: function() {
    this.classList.remove('over');
  },
  init: function(elem) {
    elem.draggable = true;
    elem.addEventListener('dragstart', this.start, false);
    elem.addEventListener('dragenter', this.enter, false)
    elem.addEventListener('dragover', this.over, false);
    elem.addEventListener('dragleave', this.leave, false);
    elem.addEventListener('drop', this.drop, false);
    elem.addEventListener('dragend', this.end, false);
  },
}