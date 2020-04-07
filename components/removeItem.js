const state = require('../components/state');
const storageHelper = require('../lib/storage-helper');
const { writeListItem } = require('../components/writeListItem');

module.exports.deleteItem = (event) => {
 let $this = event.currentTarget;
 let updatedDate = state.data;
 const i = $this.parentNode.getAttribute('data-index');
 const filteredItems = updatedDate.slice(0, i).concat(updatedDate.slice(i + 1, updatedDate.length))
 state.data = filteredItems;
 $this.parentNode.style.display = 'none';


  setTimeout(() => {
   storageHelper.set('weee', filteredItems);
   if (filteredItems.length <= 0) {
     storageHelper.delete('weee');
     document.querySelector('.list').innerHTML = `<div class="task-list" style="color: #000;">Add your first task item</div>`
   } else {
    document.querySelector('.list').innerHTML = ``
    document.querySelector('.list').innerHTML = writeListItem(state.data)
   
    const $listItem = document.querySelectorAll('.to-do-item');
    for(let i = 0; i < $listItem.length; i++) {
      if($listItem[i].classList.contains('is-checked')) {
        $listItem[i].querySelector('.checker').setAttribute('checked', true)
      }
    }
  }
    if(state.data.length <= 1) {
      document.querySelector('.move-parent').style.display = 'none';
    }
  })
}