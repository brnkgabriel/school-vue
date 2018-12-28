// Function handleDragStart(), it's purpose is to store the id of the draggable element.

function start(e) {
  // using "this" is the same as using e.target
  e.dataTransfer.setData('text', this.id);
}

// The dragenter event fires when dragging an object over the target.
// The css class "drag-enter" is appended to the target object
function enter(e) {
  this.classList.add('drag-enter')
}

function leave(e) {
  this.classList.remove('drag-enter')
}

// Function handles dragover event eg.. moving your source div over the target div element.
// If drop event occurs, the function retrieves the draggable element's id from the DataTransfer object
function over(e) {
  e.preventDefault(); 
  return
}

function drop(e) { 
  e.preventDefault();// Stores dragged elements ID in var draggedId
  var draggedId = e.dataTransfer.getData('text');
  // Stores references to element being dragged in var draggedEl
  var draggedEl = document.getElementById(draggedId);

  // if the event "drop" is fired on the dragged elements original drop target i.e. it's current parentNode,
  // then set it's css class to="" which will remove dotted lines around the drop target and exit the function
  if (draggedEl.parentNode == this) {
    this.classList.remove("drag-enter");
    return;
  }

  // Otherwise if the event "drop" is fired from a 
  // different target element, detach the dragged 
  // element node from it's current parentNode and 
  // append it to the new target element. Also remove
  // dotted css class.
  draggedEl.parentNode.removeChild(draggedEl);
  this.appendChild(draggedEl);
  this.classList.remove("drag-enter")
}


// Retrieve two groups of elements, those that are draggable and those that are drop targets
var draggable = document.querySelectorAll('[draggable]');
var targets = document.querySelectorAll('[data-drop-target]');

// Note: using the document.querySelectorAll() will
// acquire every element that is using the attribute
// defined in the (..)

// Register event listeners for the "dragstart" event
// on the draggable elements:

for (var i = 0; i < draggable.length; i++) {
  draggable[i].addEventListener('dragstart', start);
}

// Register event listeners for "dragover", "drop", 
// "dragenter" & "dragleave" events on the drop target 
// elements
for (var i = 0; i < targets.length; i++) {
  targets[i].addEventListener('dragover', over);
  targets[i].addEventListener('drop', drop);
  targets[i].addEventListener('dragenter', enter);
  targets[i].addEventListener('dragleave', leave);
}