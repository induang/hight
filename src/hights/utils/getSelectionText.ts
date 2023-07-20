export function getSelectionText(){
	let selectedText = '';
	if(window && window.getSelection){
		selectedText = window.getSelection()?.toString() || '';
	}else if(document.getSelection){
		selectedText = document.getSelection()?.toString() || '';
	}
	return selectedText;
}