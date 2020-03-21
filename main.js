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

  .to-do-item label{
    color: black;
    font-size: 13px;
    top: 3px;
    line-height: 18px;
    position: relative;
  }
  .to-do-item.is-checked label {
    color: #aaa;
  }
  .delete {
    opacity: 0;
    font-size: 10px;
    color: #aaa;
    right: 0;
    text-align: right;
    margin-top: 4px;
    position: absolute;
    background: #4F95E8;
    padding: 4px 6px;
  }

  .to-do-item:hover .delete {
    opacity: 1;
    color: #fff;
  }

  .to-do-item:hover .delete:hover {
    opacity: 1;
  }

  .to-do-parent {
    background: white;
    overflow: auto;
    position: relative;
    width: 100%;
    overflow: auto;
  }

  .action-group {
    background: white;
    position: relative;
    width: 100%;
    padding: 10px;
  }

  .to-do-parent__inner {
    padding: 20px 20px 0px 20px;
  }

  .outer-most {
    position: relative;
  }
  .button-group {
    display: flex;
    justify-content: center;
  }
  h1 {
    padding: 0px 0px 10px 0px;
  }

  input::placeholder {
    color: green;
  }

`

const panelMarkup = () => {
  let html = /* html */ `
  <style>
    ${styles}
  </style>
    <div class="outer-most">
      <div class="to-do-parent">
        <div class="to-do-parent__inner"><h1>✏️ Task list</h1>
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
    console.log(data.length)
    let listItems = '';
    $('.list').html('');
    for(let i = 0; i < data.length; i++) {
      let isChecked = data[i].done ? 'checked' : ''
      listItems += /*html*/`
        <div class="to-do-item is-${isChecked}">
          <div class="checklist-group">
            <input class="checker" style="position: relative; top: 1px;" type="checkbox" id="checklist-item-"${[i]}>
            <label style="margin-left: 8px;" for="checklist-item-"${[i]}>${data[i].toDo}</label>
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
  } else {
    console.log('user has no data')
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
      
      $('.list').append(`
      <div class="is-new to-do-item is-${setData.done}">
        <div class="checklist-group">
          <input class="checker" style="position: relative; top: 1px;" type="checkbox">
          <label style="margin-left: 8px;">${setData.toDo}</label>
        </div>
        <div class="delete">
          <div class="delete-item">(Remove)</div>
        </div>
      </div>
      `)

      $("#input-el").val('');
      $("#input-el").focus();
    }
    

    $(document).on('click', '.to-do-item',  function() {
      let cleanItem = allItems;
      let checked = $(this).hasClass('is-checked')
      if(checked) {
        $(this).find('.checker').attr('checked', false)
        $(this).removeClass('is-checked')
      } else {
        $(this).find('.checker').attr('checked', true)
        $(this).addClass('is-checked')
      }
      if(cleanItem[$(this).index()].done) {
        cleanItem[$(this).index()].done = false
      } else {
        cleanItem[$(this).index()].done = true
      }
      storageHelper.set('weee', cleanItem);
      console.log(allItems)
    })



    $('.form').on('submit', addCheckListItem)

  
  
  
    function deleteData() {
      console.log('deleted')
      storageHelper.delete('weee')
      allItems = [];
      $('.list').html(`<div class="task-list" style="color: #999;">Add your first task item</div>`)
    }
  
  
    $('.reset').on('click', deleteData)


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
