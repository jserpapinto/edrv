/** @format */
import chargestations from '~/pages/chargestations'

export const state = () => ({
  userType: null,
  modal: {
    open: false,
    chargestation: null
  },
  chargestations: [
    {
      id: 1,
      address: 'rua de cima',
      city: 'Porto',
      chargestations: 4,
      hours: [
        {
          weekDay: 1,
          start: '08:00',
          end: '20:00'
        }
      ]
    },
    {
      id: 2,
      address: 'rua de baixo',
      city: 'Lisboa',
      chargestations: 2,
      hours: [
        {
          weekDay: 1,
          start: '08:00',
          end: '20:00'
        }
      ]
    },
    {
      id: 3,
      address: 'rua de esquerda',
      city: 'Amarante',
      chargestations: 3,
      hours: [
        {
          weekDay: 1,
          start: '08:00',
          end: '12:00'
        },
        {
          weekDay: 3,
          start: '08:00',
          end: '20:00'
        },
        {
          weekDay: 4,
          start: '08:00',
          end: '20:00'
        },
        {
          weekDay: 1,
          start: '14:00',
          end: '20:00'
        }
      ]
    },
    {
      id: 4,
      address: 'rua de direita',
      city: 'Porto',
      chargestations: 1,
      hours: [
        {
          weekDay: 1,
          start: '08:00',
          end: '20:00'
        }
      ]
    },
    {
      id: 5,
      address: 'rua de kapum',
      city: 'Lisboa',
      chargestations: 2,
      hours: [
        {
          weekDay: 1,
          start: '08:00',
          end: '20:00'
        }
      ]
    },
    {
      id: 6,
      address: 'rua de banana',
      city: 'Lisboa',
      chargestations: 1,
      hours: [
        {
          weekDay: 1,
          start: '08:00',
          end: '20:00'
        }
      ]
    },
    {
      id: 7,
      address: 'rua de maca',
      city: 'Lisboa',
      chargestations: 2,
      hours: [
        {
          weekDay: 1,
          start: '08:00',
          end: '20:00'
        }
      ]
    }
  ]
})

export const getters = {
  getUserType(state) {
    return state.userType
  },
  getChargestations(state) {
    return state.chargestations
  },
  getModalState(state) {
    return state.modal.open
  },
  getModalChargestation(state) {
    return state.modal.chargestation
  }
}

export const actions = {
  setUserType({ commit }, type) {
    commit('SET_USER_TYPE', type)
  },
  setModalChargestation({ commit }, chargestation) {
    commit('SET_MODAL_CHARGESTATION', chargestation)
  },
  openModal({ commit }) {
    commit('OPEN_MODAL')
  },
  closeModal({ commit }) {
    commit('CLOSE_MODAL')
  },
  addHours({ commit }, { id, hour }) {
    commit('ADD_HOURS', { id, hour })
  },
  deleteHours({ commit }, { id, hour }) {
    commit('DELETE_HOURS', { id, hour })
  }
}

export const mutations = {
  SET_USER_TYPE(state, type) {
    state.userType = type
  },
  SET_MODAL_CHARGESTATION(state, chargestation) {
    chargestation.hours.sort((a, b) => {
      console.log(a, b)
      return a.weekDay - b.weekDay
    })
    state.modal.chargestation = chargestation
  },
  OPEN_MODAL(state) {
    state.modal.open = true
  },
  CLOSE_MODAL(state) {
    state.modal.open = false
    state.modal.chargestation = null
  },
  ADD_HOURS(state, { id, hour }) {
    const cs = state.chargestations.find(
      chargestation => chargestation.id === id
    )
    cs.hours.push(hour)
    cs.hours.sort((a, b) => {
      console.log(a, b)
      return a.weekDay - b.weekDay
    })
  },
  DELETE_HOURS(state, { id, hour }) {
    const cs = state.chargestations.find(
      chargestation => chargestation.id === id
    )
    // This is not the best way to find the hours... They should have an ID.
    const hourIndex = cs.hours.findIndex(h => {
      if (
        h.weekDay === hour.weekDay &&
        h.start === hour.start &&
        h.end === hour.end
      ) {
        return true
      }
    })
    cs.hours.splice(hourIndex, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
