import { createToast } from 'mosha-vue-toastify'

export const toast = {
  success(message) {
    createToast(message, {type: 'success', postion:'top-right'})
  },

  error(message) {
    createToast(message, {
      type: 'error',
      position: 'top-right',
      backgroundColor: '#ff5252',
      color: '#ffffff',
      showIcon: true,
      toastBackgroundColor: '#ff5252',
      theme: null
    })
  },

  info(message) {
    createToast(message, {type: 'success', position: 'top-right'})
  }
}