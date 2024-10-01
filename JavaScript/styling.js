function searchT(){
    searchByTitle.style.cssText = `opacity: 1; z-index: 99;`;
    searchByCategory.style.cssText = `opacity: 0; z-index: 98;`;
    searchByCategory.value = "";
}

function searchC(){
    searchByTitle.style.cssText = `opacity: 0; z-index: 98;`;
    searchByCategory.style.cssText = `opacity: 1; z-index: 99;`;
    searchByTitle.value = "";
}