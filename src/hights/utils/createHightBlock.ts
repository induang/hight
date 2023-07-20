export function createHightBlock(): HTMLDivElement{
	// const span = document.createElement("span");
	const div = document.createElement("div");
	
	div.style.backgroundColor = '#86efac';
	div.style.display = 'inline';
	const modal = document.createElement("div");
	modal.style.display = 'absolute';
	modal.style.left = '0';
	modal.style.right = '0';
	modal.style.width = '250px';
	modal.style.height = '125px';
	modal.style.backgroundColor = '#bef264';
	modal.textContent = 'hey';
	console.log('ans', div.appendChild(modal));
	div.addEventListener('mouseover', (event) => {
		console.log('come');
		const modalDIV = div.querySelector('div');
		console.log('modalDIV', modalDIV);
		if(modalDIV){
			modalDIV.style.visibility = 'visible'
		}
	})
	return div;
}
function attachModal(element: HTMLSpanElement): void{
	const modal = document.createElement("div");
	modal.style.visibility = 'hidden';
	modal.style.width = '250px';
	modal.style.height = '125px';
	modal.style.backgroundColor = '#bef264';
	modal.textContent = 'hey';
	console.log('createdModal', modal);
	element.appendChild(modal);
	console.log('element', element.children);
}