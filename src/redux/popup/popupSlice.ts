import { createSlice } from '@reduxjs/toolkit'

interface PopupState {
  isOpenPopup: boolean
}

const initialState: PopupState = {
  isOpenPopup: false
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup: (state) => {
      state.isOpenPopup = true
    },
    hidePopup: (state) => {
      state.isOpenPopup = false
    }
  }
})

export const { showPopup, hidePopup } = popupSlice.actions
export default popupSlice.reducer
