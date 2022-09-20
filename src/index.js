/*
 * @Author: dary
 * @Date: 2021-01-29 17:51:28
 * @LastEditors: dary
 * @LastEditTime: 2021-01-29 18:04:51
 * @Description: file content
 */
import './index.css';
import App from './App.svelte';
import 'uno.css'

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;