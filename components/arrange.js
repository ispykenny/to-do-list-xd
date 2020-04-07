const storageHelper = require('../lib/storage-helper');
const state = require('../components/state');
const { writeListItem } = require('../components/writeListItem');


module.exports.arrange = (event) => {
  const $list = document.querySelector('.list');
  const $this = event.currentTarget;
  const index = $this.parentNode.parentNode.parentNode.getAttribute('data-index')
  let data = state.data;
  let currentStatus = data[index]

  if($this.classList.contains('up')) {
    data[index] = data[index - 1];
    data[index - 1] = currentStatus;
  } else {
    data[index] = data[index + 1];
    data[index + 1 ] = currentStatus;
  }

  state.data = data;
  storageHelper.set('weee', state.data);
  $list.innerHTML = writeListItem(state.data)

  const $listItem = document.querySelectorAll('.to-do-item');

  for(let i = 0; i < $listItem.length; i++) {
    if($listItem[i].classList.contains('is-checked')) {
      $listItem[i].querySelector('.checker').setAttribute('checked', true)
    }
  }

}