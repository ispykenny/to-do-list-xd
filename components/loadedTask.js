const $ = require('../lib/jquery');
const storageHelper = require('../lib/storage-helper');
const state = require('./state');

module.exports.loadedTask = data => {
  if (data) {
    if (data.length >= 1) {
      let listItems = '';
      $('.list').children().remove();
      for (let i = 0; i < data.length; i++) {
        let isChecked = data[i].done ? 'checked' : ''
        listItems += /*html*/`
        <div class="to-do-item is-${isChecked}">
          <div class="checklist-group">
            <input class="checker" style="position: relative; top: 1px;" type="checkbox" id="checklist-item-"${[i]}>
            <label style="margin-left: 4px;" for="checklist-item-"${[i]}>${data[i].toDo}</label>
          </div>
          <div class="delete">
            <div class="delete-item">(Remove)</div>
          </div>
        </div>
      `
        state.data.push(data[i])
      }
      $('.list').html(listItems)
      $('.to-do-item').each(function () {
        if ($(this).hasClass('is-checked')) {
          $(this).find('.checker').attr('checked', true)
        }
      })
    }
  } else {
    console.log('user has no data')
    storageHelper.delete('weee');
  }
}