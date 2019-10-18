/**
 * Created by hzzhangzhang1 on 2017/12/22.
 */
import { get,post } from './tools';
import * as config from './config';

// 获取用户信息
export const getUserInfo = () => get({url: config.GETUSERINFO})

