import './assets/styles/reset.css';
import './assets/styles/public.scss';
import './assets/styles/index.less';
import image from './assets/img/demo1.jpg';
import React from 'react'

global.vbus = new React()

if (module.hot) {
	module.hot.accept()
}

var func = str => {
	document.getElementById('app').innerHTML = 'hello world2';
	document.getElementById('postcss').innerHTML = str;
}
func("<h1>我自动添dfsafasf 加了的范德萨发前</h1><img src='" + image + "'/>")

