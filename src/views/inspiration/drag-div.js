export default function DragDiv() {}

DragDiv.prototype.start = function (evt) {
  evt.target.style.opacity = '0.4';
  window.dragSrcEl = this;
  evt.dataTransfer.effectAllowed = 'move';
  evt.dataTransfer.setData('text/html', this.innerHTML);
}

DragDiv.prototype.enter = function (evt) {
  evt.target.classList.add('over');
}

DragDiv.prototype.over = function (evt) {
  if (evt.preventDefault) { evt.preventDefault(); }
  evt.dataTransfer.dropEffect = 'move';
  return false;
}

DragDiv.prototype.leave = function (evt) {
  evt.target.classList.remove('over');
}

DragDiv.prototype.drop = function (evt) {
  if (evt.stopPropagation) { evt.stopPropagation(); }

  window.dragSrcEl.style.opacity = '1';

  if (window.dragSrcEl.parentNode == this) {
    this.classList.remove('over');
    return;
  }


  window.dragSrcEl.parentNode.removeChild(window.dragSrcEl)
  this.classList.remove('over');

  return false;
}
