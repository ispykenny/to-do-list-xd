const state = require('../components/state');
const storageHelper = require('../lib/storage-helper');

module.exports.checkboxChecker = async (event) => {
  const cleanItem = state.data;
  const $this = event.currentTarget;
  const checked  = $this.parentNode.parentNode.classList.contains('is-checked');
  
  if (checked) {
    $this.querySelector('.checker').checked = false;
    $this.parentNode.parentNode.classList.remove('is-checked');
  } else {
    $this.querySelector('.checker').checked = true;
    $this.parentNode.parentNode.classList.add('is-checked')
  }

  if (cleanItem[$this.parentNode.parentNode.getAttribute('data-index')].done) {
    cleanItem[$this.parentNode.parentNode.getAttribute('data-index')].done = false
  } else {
    cleanItem[$this.parentNode.parentNode.getAttribute('data-index')].done = true
  }

 
  storageHelper.set('weee', cleanItem);
}