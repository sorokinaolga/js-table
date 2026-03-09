import {storage} from '@core/utils'
import {defaultStyles} from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles
};

export const initialState = storage('table-state')
  ? storage('table-state')
  : defaultState
