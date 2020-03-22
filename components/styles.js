module.exports =  /*css*/ `

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

.task-list {
  padding-top: 8px;
  font-size: 12px;
  padding-left: 6px;
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
  /* opacity: 0; */
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
}

.to-do-item:hover .delete:hover {
  color: #000;
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
  padding: 0px 5px 0px 5px;
}

.outer-most {
  position: relative;
}

.checklist-group {
  width: 80%;
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