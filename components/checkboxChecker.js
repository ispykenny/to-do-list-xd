const state = require('../components/state');
const $ = require('../lib/jquery');
const storageHelper = require('../lib/storage-helper');

module.exports.checkboxChecker = async (event) => {
  const cleanItem = state.data;
  const $this = event.currentTarget;
  const checked  = $this.parentNode.parentNode.classList.contains('is-checked');
  

  if (checked) {
    $this.querySelector('.checker').setAttribute('checked', false)
    $this.parentNode.parentNode.classList.remove('is-checked');
  } else {
    $this.querySelector('.checker').setAttribute('checked', true)
    $this.parentNode.parentNode.classList.add('is-checked')
  }

  // if (cleanItem[$this.parents('.to-do-item').index()].done) {
  //   cleanItem[$this.parents('.to-do-item').index()].done = false
  // } else {
  //   cleanItem[$this.parents('.to-do-item').index()].done = true
  // }
  storageHelper.set('weee', cleanItem);
}