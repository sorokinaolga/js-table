const { Excel } = require('./components/excel/Excel');

require('./scss/index.scss');

const excel = new Excel('#app', {
  components: [],
});

console.log('Excel', excel);