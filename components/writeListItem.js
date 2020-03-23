const $ = require('../lib/jquery');

module.exports.writeListItem = function(data) {
  let listItems = '';
  for (let i = 0; i < data.length; i++) {
  let isChecked = data[i].done ? 'checked' : ''
  listItems += /*html*/ `
    <div class="to-do-item is-${isChecked}" style="position: relative;">
      <div class="checklist-group">
        <input class="checker" style="position: relative; top: 1px;" type="checkbox" id="checklist-item-"${[i]}>
        <label style="margin-left: 4px;" for="checklist-item-"${[i]}>${data[i].toDo}</label>
      </div>
      <div class="delete">
        <div class="delete-item">(Remove)</div>
      </div>
    </div>
  `
  }
  return listItems;
}
