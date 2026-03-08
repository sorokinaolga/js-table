import { ExcelComponent } from "../../core/ExcelComponent";
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  init() {
    super.init();

    this.$formula = this.$root.find('[data-type="formula"]');
    this.$on('table:select', $cell => {
      this.$formula.text($cell.text());
    });
    this.$subscribe(state => {
      this.$formula.text(state.currentText);
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div data-type="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(evt) {
    this.$emit('formula:input', $(evt.target).text());
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if(keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}