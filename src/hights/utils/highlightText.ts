import { createHightBlock } from "./createHightBlock";

export function highlightText(){
	const hightBlock = createHightBlock();
	const range = window.getSelection()?.getRangeAt(0);
	range?.surroundContents(hightBlock);
}