import { highlightText } from "./utils";

console.log('----------✨ extension plus run ✨---------')
console.log('---------✨', new Date(new Date().getTime()).toLocaleString('sv'), '✨---------');

document.addEventListener('keydown', (event) =>{
	if(event.ctrlKey && event.key === 'a'){
		highlightText();
	}
})