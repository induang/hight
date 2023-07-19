console.log('------------✨ extension run ✨------------')
console.log('---------✨', new Date(new Date().getTime()).toLocaleString('sv'), '✨---------');

function getSelectionText(){
	let selectedText = '';
	if(window.getSelection){
		selectedText = window.getSelection().toString();
	}else if(document.getSelection){
		selectedText = document.getSelection();
	}else if(document.selection){
		selectedText = document.selection.createRange().text;
	}
	return selectedText;
}

function generateMindGraph(){}

function storageHightBlock(){}

// bg change, show small modal when hover
// modal can change hight block level
// maybe need to use rxjs to update mind graph when block relationship change
function createHightBlock(){}

function levitateBlockWhenOver(){}

function showPanelWhenClick(){}


function highlightText(){
	const span = document.createElement("span");
	// span.classList.add('bg-red-300');
	span.style.backgroundColor = '#86efac';
	span.addEventListener('mouseover', (event) => {
		console.log('mouse come.')
	})
	
	const range = window.getSelection().getRangeAt(0);
	range.surroundContents(span);
}

document.addEventListener('keydown', (event) =>{
	if(event.ctrlKey && event.key === 'a'){
		highlightText();
	}
})

