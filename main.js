/*
  Plugin Documentation
  https://adobexdplatform.com/plugin-docs/
  @Plugin: Notes
  @Author Kenny Krosky 
*/
const storageHelper = require('./lib/storage-helper');
const styles = require('./components/styles');
const $ = require('./lib/jquery');
let panel;
let allItems = [];

const panelMarkup = () => {
  let html = /* html */ `
  <style>
    ${styles}
  </style>
    <div class="outer-most">
      <div class="to-do-parent">
        <div class="to-do-parent__inner">
          <div class="list">
            <div class="task-list" style="color: #999;">Add your first task item</div>
          </div>
        </div>
      </div>
      <div class="action-group">
        <form class="form">
          <input uxp-quiet="true" name="el" id="input-el" placeholder="Add item" autofocus>
          <div class="button-group">
            <button class="reset">Clear</button> 
            <button uxp-variant="cta" id="addNote">Add</button>
          </div>
        </form>
        
      </div>
    </div>
  `;
  panel = document.createElement("div");
  panel.innerHTML = html;
  return panel;
};



const writeToDos = data => {
  if(data) {
   if(data.length >= 1) {
    console.log(data.length)
    let listItems = '';
    $('.list').children().remove();
    for(let i = 0; i < data.length; i++) {
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
      allItems.push(data[i])
    }


    $('.list').html(listItems)
    $('.to-do-item').each(function() {
      if($(this).hasClass('is-checked')) {
        $(this).find('.checker').attr('checked', true)
      }
    })
   }
  } else {
    console.log('user has no data')
    storageHelper.delete('weee');
  }
}



const show = async event => {
  if (!panel) {
    await event.node.appendChild(panelMarkup());
    
    let lastInput = await storageHelper.get('weee');
    writeToDos(lastInput);

    
    /*
      Add items to checklist 
      Updates lastInput = await storageHelper.get('weee')
    */
    async function addCheckListItem() {
      let inputValue = document.getElementById("input-el").value
      if(inputValue < 1) return;
      $('.task-list').hide();
      let setData = {
        toDo: inputValue,
        done: false
      }

      allItems.push(setData)
      console.log(allItems)
      storageHelper.set('weee', allItems);
      $('.list').children().remove();

      let listItems = '';

      for(let i = 0; i < allItems.length; i++) {
        let isChecked = allItems[i].done ? 'checked' : ''
        listItems += /*html*/`
          <div class="to-do-item is-${isChecked}">
            <div class="checklist-group">
              <input class="checker" style="position: relative; top: 1px;" type="checkbox" id="checklist-item-"${[i]}>
              <label style="margin-left: 4px;" for="checklist-item-"${[i]}>${allItems[i].toDo}</label>
            </div>
            <div class="delete">
              <div class="delete-item">(Remove)</div>
            </div>
          </div>
        `
      }
  
      $('.list').html(listItems)
      
      $('.to-do-item').each(function() {
        if($(this).hasClass('is-checked')) {
          $(this).find('.checker').attr('checked', true)
        }
      })
     



      $("#input-el").val('');
      $("#input-el").focus();
    }
    
    /*
      Check hack
    */
    $(document).on('click', '.checklist-group',  function() {
      let cleanItem = allItems;
      let checked = $(this).parent().hasClass('is-checked')
      console.log($(this).parents('.to-do-item').index())
      
      if(checked) {
        $(this).find('.checker').attr('checked', false)
        $(this).parent().removeClass('is-checked')
      } else {
        $(this).find('.checker').attr('checked', true)
        $(this).parent().addClass('is-checked')
      }

      if(cleanItem[$(this).parents('.to-do-item').index()].done) {
        cleanItem[$(this).parents('.to-do-item').index()].done = false
      } else {
        cleanItem[$(this).parents('.to-do-item').index()].done = true
      }
      storageHelper.set('weee', cleanItem);
      
    })



    $('.form').on('submit', addCheckListItem)
    $('#addNote').on('click', addCheckListItem);
  
  
    /*
     Reset
    */
    function deleteData() {
      console.log('deleted')
      allItems = [];
      $('.list').html(`<div class="task-list" style="color: #999;">Add your first task item</div>`)
    }
  
  
    $('.reset').on('click', deleteData)


    function removal() {
      let updatedDate = allItems;
      const i = $(this).parent().index()
      console.log(i)
      const filteredItems = updatedDate.slice(0, i).concat(updatedDate.slice(i + 1, updatedDate.length))
      allItems = filteredItems;
      $(this).parent().hide();
      // console.log(filteredItems)
      setTimeout(() => {
        storageHelper.set('weee', filteredItems)
        console.log(filteredItems.length)
        if(filteredItems.length <= 0) {
          storageHelper.delete('weee');
          $('.list').html(`<div class="task-list" style="color: #999;">Add your first task item</div>`)
        } else {
          $('.list').children().remove();

      let listItems = '';

      for(let i = 0; i < allItems.length; i++) {
        let isChecked = allItems[i].done ? 'checked' : ''
        listItems += /*html*/`
          <div class="to-do-item is-${isChecked}">
            <div class="checklist-group">
              <input class="checker" style="position: relative; top: 1px;" type="checkbox" id="checklist-item-"${[i]}>
              <label style="margin-left: 4px;" for="checklist-item-"${[i]}>${allItems[i].toDo}</label>
            </div>
            <div class="delete">
              <div class="delete-item">(Remove)</div>
            </div>
          </div>
        `
      }
  
      $('.list').html(listItems)
      
      $('.to-do-item').each(function() {
        if($(this).hasClass('is-checked')) {
          $(this).find('.checker').attr('checked', true)
        }
      })
        }
      })

    }

    $(document).on('click', '.delete', removal)


  }

}

    
  

        


const hide = event => {
  console.log('hiding')
};

module.exports = {
  panels: {
    runPlugin: {
      show,
      hide
    }
  }
};
