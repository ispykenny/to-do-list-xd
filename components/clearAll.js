const state = require('../components/state');
const storageHelper = require('../lib/storage-helper');

module.exports.clearAll = () => {
  state.data = [];
  storageHelper.delete('weee')
  document.querySelector('.list').innerHTML = `<div class="task-list" style="color: #999;">Add your first task item</div>`
}