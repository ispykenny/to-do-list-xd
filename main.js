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
  .to-do-item label{
    color: black;
    font-size: 13px;
  }
`

const panelMarkup = () => {
  let html = /* html */ `
  <style>
    ${styles}
  </style>
    <div>
      <div>
        <h1>To Dos</h1>
        <div class="list">add item</div>
        <form class="form">
          <input name="el" id="input-el" placeholder="add item">
          <button uxp-variant="cta" id="addNote" >Save Notes</button>
        </form>
        <button class="reset">reset</button> 
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

    for(let i = 0; i < data.length; i++) {
      let isChecked = data[i].done ? 'checked' : ''
      listItems += /*html*/`
        <div style="display: flex; align-items: center; justify-content: space-between;" class="to-do-item is-${isChecked}">
          <div style="display: flex; align-items: baseline;">
            <input class="checker" style="position: relative; top: 1px;" type="checkbox" id="checklist-item-"${[i]}>
            <label style="margin-left: 8px;" for="checklist-item-"${[i]}>${data[i].toDo}</label>
          </div>
          <div></div>
        </div>
      `
      allItems.push(data[i])
    }
    console.log('whwadwadwat')

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
      let setData = {
        toDo: document.getElementById("input-el").value,
        done: false
      }

      allItems.push(setData)
      storageHelper.set('weee', allItems);
      
      $('.list').append(`
      <div style="display: flex; align-items: center; justify-content: space-between;" class="is-new to-do-item is-${setData.done}">
        <div style="display: flex; align-items: baseline;">
          <input class="checker" style="position: relative; top: 1px;" type="checkbox">
          <label style="margin-left: 8px;">${setData.toDo}</label>
        </div>
        <div></div>
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
      $('.list').html('Add Item')
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
