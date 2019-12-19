// 一条重要的原则就是要记住 mutation 必须是同步函数。

import * as type from './mutation-types.js'

export default {
    // 获取用户信息
    [type.getUserInfo](state, payload) {
        state.userInfo = payload
    },

    // 更改值
    [type.changeValue](state, payload) {
        state.userInfo = payload
    },
    
}
