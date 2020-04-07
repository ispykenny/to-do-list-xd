/*
  Add items to checklist 
  Updates lastInput = await storageHelper.get('weee')
*/
const storageHelper = require('../lib/storage-helper');
const state = require('../components/state');
const { writeListItem } = require('../components/writeListItem');

module.exports.addCheckListItem = async function() {
  const $list = document.querySelector('.list')
  let inputValue = document.getElementById("input-el").value
  if (inputValue < 1) return;

  const $taskList = document.querySelector('.task-list')

  if($taskList) {
    $taskList.style.display = 'none';
  }
  
  let setData = {
    toDo: inputValue,
    done: false
  }

  state.data.push(setData)
  storageHelper.set('weee', state.data);

  $list.innerHTML = '';
  $list.innerHTML = writeListItem(state.data);

  const $listItem = document.querySelectorAll('.to-do-item');

  for(let i = 0; i < $listItem.length; i++) {
    if($listItem[i].classList.contains('is-checked')) {
      $listItem[i].querySelector('.checker').setAttribute('checked', true)
    }
  }

  document.getElementById("input-el").value = ''
  document.getElementById("input-el").focus();


  if(state.data.length <= 1) {
    document.querySelectorAll('.move-parent').style.display = 'none';
  }
}