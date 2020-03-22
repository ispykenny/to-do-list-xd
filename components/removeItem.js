const state = require('../components/state');
const $ = require('../lib/jquery');
const storageHelper = require('../lib/storage-helper');
const { writeListItem } = require('../components/writeListItem');

module.exports.deleteItem = (event) => {
  console.log('weee')
 let $this = $(event.currentTarget);
 let updatedDate = state.data;
 const i = $this.parent().index()
 const filteredItems = updatedDate.slice(0, i).concat(updatedDate.slice(i + 1, updatedDate.length))
 state.data = filteredItems;
 $this.parent().hide();
 setTimeout(() => {
   storageHelper.set('weee', filteredItems)
   console.log(filteredItems.length)
   if (filteredItems.length <= 0) {
     storageHelper.delete('weee');
     $('.list').html(`<div class="task-list" style="color: #999;">Add your first task item</div>`)
   } else {
     $('.list').children().remove();
     $('.list').html(writeListItem(state.data))
    

     $('.to-do-item').each(function () {
       if ($(this).hasClass('is-checked')) {
         $(this).find('.checker').attr('checked', true)
       }
     })
   }
 })
}