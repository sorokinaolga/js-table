import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { handlerResize } from "./table.resize";
import { isCell, shouldResize, matrix, nextSelector } from "./table.functions";
import { TableSelection } from "./TableSelection";
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
   
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown']
    })
  }
  
  toHTML() {
    return createTable();
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]'); 
    this.selection.select($cell);
  }
  onMousedown(evt) {
    if(shouldResize(evt)) {
      handlerResize(this.$root, evt);
    } else if(isCell(evt)) {
      const $target = $(evt.target);
      if(evt.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }
  onKeydown(evt) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    const {key} = evt

    if(keys.includes(key) && !evt.shiftKey) {
      evt.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);
    }
  }
}