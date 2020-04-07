const storageHelper = require('../lib/storage-helper');
const state = require('./state');

module.exports.loadedTask = data => {
  if (data) {
    if (data.length >= 1) {
      let listItems = '';
      document.querySelector('.list').innerHTML = '';
      for (let i = 0; i < data.length; i++) {
        let isChecked = data[i].done ? 'checked' : ''
        listItems += /*html*/`
        <div class="to-do-item is-${isChecked}" data-index="${i}">
          <div class="item-container">
            <div class="move-parent">
              <div class="move up">
                <img src="../images/uparrow@2x.png">
              </div>
              <div class="move down">
                <img src="../images/updown@2x.png">
              </div>
            </div>
            <div class="checklist-group">
              <input class="checker" style="position: relative; top: 1px;" type="checkbox" id="checklist-item-"${[i]}>
              <label style="margin-left: 4px;" for="checklist-item-"${[i]}>${data[i].toDo}</label>
            </div>
          </div>
          <div class="delete">
            <div class="delete-item">
              <img src="../images/close@2x.png" style="width: 8px;">
            </div>
          </div>
        </div>
      `
        state.data.push(data[i])
      }
      document.querySelector('.list').innerHTML = listItems;
      const $listItem = document.querySelectorAll('.to-do-item');
      for(let i = 0; i < $listItem.length; i++) {
        if($listItem[i].classList.contains('is-checked')) {
          $listItem[i].querySelector('.checker').setAttribute('checked', true)
        }
      }
    }
  } else {
    console.log('user has no data')
    storageHelper.delete('weee');
  }
}