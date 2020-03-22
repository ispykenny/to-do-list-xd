const state = require('../components/state');
const $ = require('../lib/jquery');
const storageHelper = require('../lib/storage-helper');

module.exports.checkboxChecker = async (event) => {
  let cleanItem = state.data;
  let $this = $(event.currentTarget);
  let checked = $this.parent().hasClass('is-checked')
  console.log($this.parents('.to-do-item').index())

  if (checked) {
    $this.find('.checker').attr('checked', false)
    $this.parent().removeClass('is-checked')
  } else {
    $this.find('.checker').attr('checked', true)
    $this.parent().addClass('is-checked')
  }

  if (cleanItem[$this.parents('.to-do-item').index()].done) {
    cleanItem[$this.parents('.to-do-item').index()].done = false
  } else {
    cleanItem[$this.parents('.to-do-item').index()].done = true
  }
  storageHelper.set('weee', cleanItem);
}