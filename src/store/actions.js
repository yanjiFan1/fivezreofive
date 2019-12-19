import axios from 'axios'
import jsonp from 'jsonp'
import { 
	getUserInfo
} from '../axios/index';

import * as type from './mutation-types.js'

export default {
	getUserInfo({ commit }) {
		getUserInfo().then(res => {
			commit('getUserInfo', res.data)
		})
	}
}	


// export const getAllMessages = ({ commit }) => {
//   api.getAllMessages(messages => {
//     commit('receiveAll', messages)
//   })
// }

// export const sendMessage = ({ commit }, payload) => {
//   api.createMessage(payload, message => {
//     commit('receiveMessage', message)
//   })
// }

// export const switchThread = ({ commit }, payload) => {
//   commit('switchThread', payload)
// }