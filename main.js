/*
  Plugin Documentation
  https://adobexdplatform.com/plugin-docs/
  @Plugin: Notes
  @Author Kenny Krosky 
*/
const storageHelper = require('./lib/storage-helper');
const $ = require('./lib/jquery');
let panel;
let allItems = [];

let styles = /*css*/ `

  .to-do-item {
    /* display: flex;  */
    align-items: center; 
    padding: 8px 0px 10px 0px;
    position: relative;
    border-bottom: 1px solid #ddd;
  }

  .to-do-item:last-child {
    border-bottom: none;
  }

  .checklist-group {
    display: flex; 
    align-content: flex-start;
    align-items: flex-start;
  }

  .title {
    padding: 0px 0px 10px 0px;
    font-size: 22px;
  }

  .to-do-item label{
    color: black;
    font-size: 12px;
    top: 3px;
    line-height: 18px;
    position: relative;
  }

  .to-do-item.is-checked label {
    color: #aaa;
  }

  .delete {
    opacity: 0;
    font-size: 8px;
    color: #aaa;
    right: 0;
    text-align: right;
    margin-top: 4px;
    position: absolute;
    padding: 2px;
  }

  .to-do-item:hover .delete {
    opacity: 1;
    color: #000;
  }

  .to-do-item:hover .delete:hover {
    opacity: 1;
    color: #4A95E8;
  }

  .to-do-parent {
    overflow: auto;
    position: relative;
    width: 100%;
    overflow: auto;
  }

  .action-group {
    position: relative;
    width: 100%;
    padding: 10px;
  }

  .to-do-parent__inner {
    padding: 20px 10px 0px 10px;
  }

  .outer-most {
    position: relative;
  }

  .button-group {
    display: flex;
    justify-content: center;
  }

  input::placeholder {
    color: green;
  }

  @media(max-width: 300px) {
    .title {
      font-size: 14px;
    }

    .to-do-item label{
      font-size: 10px;
    }
  }

`

const panelMarkup = () => {
  let html = /* html */ `
  <style>
    ${styles}
  </style>
    <div class="outer-most">
      <div class="to-do-parent">
        <div class="to-do-parent__inner"><span class="title">✏️ Task list</span>
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
            <button uxp-variant="cta" id="addNote" >Add</button>
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
    $('.list').html('');
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
    console.log('weee')
    
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
      $('.task-list').hide();
      let setData = {
        toDo: document.getElementById("input-el").value,
        done: false
      }

      allItems.push(setData)
      storageHelper.set('weee', allItems);

      console.log('hi', allItems)
      
      $('.list').append(`
      <div class="is-new to-do-item is-${setData.done}">
        <div class="checklist-group">
          <input class="checker" style="position: relative; top: 1px;" type="checkbox">
          <label style="margin-left: 4px;">${setData.toDo}</label>
        </div>
        <div class="delete">
          <div class="delete-item">(Remove)</div>
        </div>
      </div>
      `)

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

  
  
    /*
     Reset
    */
    function deleteData() {
      console.log('deleted')
      storageHelper.delete('weee')
      allItems = [];
      $('.list').html(`<div class="task-list" style="color: #999;">Add your first task item</div>`)
    }
  
  
    $('.reset').on('click', deleteData)


    function removal() {
      let updatedDate = allItems;
      const i = $(this).parent().index()
      const filteredItems = updatedDate.slice(0, i).concat(updatedDate.slice(i + 1, updatedDate.length))
      allItems = filteredItems;
      $(this).parent().hide();
      console.log(filteredItems)
      setTimeout(() => {
        storageHelper.set('weee', filteredItems)
        console.log(filteredItems.length)
        if(filteredItems.length <= 0) {
          storageHelper.delete('weee');
          $('.list').html(`<div class="task-list" style="color: #999;">Add your first task item</div>`)
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
