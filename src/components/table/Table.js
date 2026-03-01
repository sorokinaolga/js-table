import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { handlerResize } from "./table.resize";
import { isCell, shouldResize, matrix, nextSelector } from "./table.functions";
import { TableSelection } from "./TableSelection";
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
   
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
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

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', text => {
      this.selection.current.text(text);
    })

    this.$on('formula:done', () => {
      this.selection.current.focus();
    })
  }
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
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
      this.selectCell($next);
    }
  }
  onInput(evt) {
    this.$emit('table:input', $(evt.target));
  }
}