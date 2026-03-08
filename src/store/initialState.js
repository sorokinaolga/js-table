import {storage} from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
}

export const initialState = storage('table-state')
  ? storage('table-state')
  : defaultState
