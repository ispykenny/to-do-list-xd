module.exports =  /*css*/ `

.to-do-item {
  align-items: center; 
  padding: 8px 0px 10px 0px;
  position: relative;
  border-bottom: 1px solid #ddd;
  width: 100%;
}

.to-do-item:last-child {
  padding-bottom: 0px;
}

.item-container {
  display: flex;
}

.move-parent {
  width: 12px;
  position: relative;
  top: 1px;
}

.move-parent img:hover {
  opacity: 0.6;
}
.to-do-item:last-child {
  border-bottom: none;
}

.to-do-item:first-child .move.up {
  display: none;
}

.to-do-item:first-child .move.down img {
  top: 8px;
  position: absolute;
  cursor: pointer;
}

.to-do-item:last-child .move.up img {
  top: 8px;
  position: absolute;
  cursor: pointer;
}

.to-do-item:last-child .move.down {
  display: none;
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
  padding-bottom: 8px;
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
  opacity: 0;
  font-size: 8px;
  color: #aaa;
  right: 0;
  text-align: right;
  position: absolute;
  z-index: 99;
  top: 8px;
  padding: 4px;
  background: #E1E1E1;
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
  padding: 0px 5px;
}

.action-group input {
  width: 100%;
}

.to-do-parent__inner {
  padding: 0px 5px 0px 5px;
}

.outer-most {
  position: relative;
}

.checklist-group {
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: center;
}

@media(max-width: 300px) {
  .title {
    font-size: 14px;
  }

  .to-do-item label{
    font-size: 12px;
  }
}

`