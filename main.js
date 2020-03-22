/*
  Plugin Documentation
  https://adobexdplatform.com/plugin-docs/
  @Plugin: Task List
  @Author Kenny Krosky @ispykenny 
*/
const $ = require('./lib/jquery');
const storageHelper = require('./lib/storage-helper');
const { panelContainer } = require('./components/panelContainer');
const { addCheckListItem } = require('./components/addToNotes');
const { checkboxChecker } = require('./components/checkboxChecker')
const { deleteItem } = require('./components/removeItem');
const { clearAll } = require('./components/clearAll');
const { loadedTask } = require('./components/loadedTask')
let panel;

const show = async event => {
  if (!panel) {
    await event.node.appendChild(panelContainer());
    let initialStateData = await storageHelper.get('weee');
    loadedTask(initialStateData);
    $('.form').on('submit', addCheckListItem);
    $('#addNote').on('click', addCheckListItem);
    $('.reset').on('click', clearAll);
    $(document).on('click', '.delete', deleteItem);
    $(document).on('click', '.checklist-group', checkboxChecker)
  }
}

const hide = (event) => {
  event.node.innerHTML = '';
  console.log('task list closed')
}

module.exports = {
  panels: {
    runPlugin: {
      show,
      hide
    }
  }
};
