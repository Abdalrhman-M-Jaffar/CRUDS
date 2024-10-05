// variables

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let totalPrice = document.getElementById('total-price');
let count = document.getElementById('count');
let categroy = document.getElementById('category');
let createBtn = document.getElementById('create-btn');
let deleteBtn = document.getElementById('deletebtn');
let addNewE = document.getElementById('newE');
let basicData = document.getElementById('basic-data');
let searchInput = document.getElementById('search');
let searchByTitle = document.getElementById('searchByTitle');
let searchByCategory = document.getElementById('searchByCategory');
basicData = `
    <tr id="basic-data" class="basic-data">
        <td>ID</td>
        <td>Title</td>
        <td>Category</td>
        <td>Total Price</td>
        <td>Update</td>
        <td>delete</td>
    </tr>
`
let mood = 'Create';
let tempI = 0;

// auto function

window.onload = function(){
    searchByTitle.click();
    title.focus();
}

// total price

function TotalPrice(){
    if(price.value.length > 0 && price.value > 0 && taxes.value.length > 0){
        totalPrice.style.cssText = `background-color: #64ff96;`;
        totalPrice.innerHTML = (+price.value + (price.value * (taxes.value / 100)) - (price.value * (discount.value / 100))).toFixed(2);
    }
    else{
        totalPrice.style.cssText = `background-color: #ff6464;`;
        totalPrice.innerHTML = '';
    }
}

// functions

let data = [];
if(localStorage.order != null){
    data = JSON.parse(localStorage.order);
}
else{
    data = [];
}

let dataOB = {};

function Create(){
    if(title.value.length > 0 && price.value.length > 0 && taxes.value.length > 0 && discount.value.length > 0 && count.value.length > 0 && categroy.value.length > 0){
        dataOB = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            discount: discount.value,
            totalPrice: totalPrice.innerHTML,
            count: count.value,
            categroy: categroy.value.toLowerCase(),
        }
        if(count.value <= 0){
            count.value = 1;
            if(mood == 'Create'){
                for(let i = 0; i < count.value; i++){
                    data.push(dataOB);
                    localStorage.setItem('order', JSON.stringify(data));
                }
            }
            
            else if(mood == 'Update'){
                data[tempI] = dataOB;
                localStorage.order = JSON.stringify(data);
                count.style.cssText = `display: flex;`;
                createBtn.innerHTML = 'Create';
                mood = 'Create';
            }
        }
        else if (count.value > 0){
            if(mood == 'Create'){
                for(let i = 0; i < count.value; i++){
                    data.push(dataOB);
                    localStorage.setItem('order', JSON.stringify(data));
                }
            }
            
            else if(mood == 'Update'){
                data[tempI] = dataOB;
                localStorage.order = JSON.stringify(data);
                count.style.cssText = `display: flex;`;
                createBtn.innerHTML = 'Create';
                mood = 'Create';
            }
        }

        clearInputs();
        showData();
        deleteBtn.style.cssText = `display: flex;`;
        deleteBtn.innerHTML = `Delete All (${data.length})`;
    }
}

// clear inputs

function clearInputs(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    TotalPrice();
    count.value = '';
    categroy.value = '';
}

// show items

function showData(){
    let newElement = '';
    for(let i = 0; i < data.length; i++){
        newElement += `
            <tr>
                <td>${i+1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].categroy}</td>
                <td>${data[i].totalPrice}</td>
                <td><button onclick="updateData(${i});">Update</button></td>
                <td><button onclick="deleteAtpos(${i});">Delete</button></td>
            </tr>
        `
    }
    addNewE.innerHTML = (basicData + newElement);
}
showData();

// delete single item

function deleteAtpos(i){
    data.splice(i,1);
    localStorage.order = JSON.stringify(data);
    showData();
    deleteBtn.innerHTML = `Delete All (${data.length})`;
}

// delete All

function deleteAll(){
    if(data.length > 0){
        deleteBtn.style.cssText = `display: flex;`;
        deleteBtn.innerHTML = `Delete All (${data.length})`;
        data.splice(0,data.length);
        localStorage.order = JSON.stringify(data);
        showData();
    }
    deleteBtn.style.cssText = `display: none;`;
    deleteBtn.innerHTML = `Delete All (${data.length})`;
}

if(data.length > 0){
    deleteBtn.style.cssText = `display: flex;`;
    deleteBtn.innerHTML = `Delete All (${data.length})`;
}
else if (data.length == 0){
    deleteBtn.style.cssText = `display: none;`;
}

// Update

function updateData(i){
    mood = 'Update';
    count.style.cssText = `display: none;`;
    createBtn.innerHTML = 'Update';

    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    count.value = data[i].count;
    discount.value = data[i].discount;
    totalPrice.innerHTML = data[i].totalPrice;
    categroy.value = data[i].categroy;
    TotalPrice()

    tempI = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

// Search

searchByTitle.onclick = function(){
    searchInput.placeholder = 'Search by Title';
    searchInput.focus();
    searchInput.value = '';
    showData();
}

searchByCategory.onclick = function(){
    searchInput.placeholder = 'Search by Category';
    searchInput.focus();
    searchInput.value = '';
    showData();
}

function searchForE(value){
    let newElement = '';
    if(searchInput.placeholder == 'Search by Title'){
        for(let i = 0; i < data.length; i++){
            if(data[i].title.includes(value.toLowerCase())){
                newElement += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].categroy}</td>
                        <td>${data[i].totalPrice}</td>
                        <td><button onclick="updateData(${i});">Update</button></td>
                        <td><button onclick="deleteAtpos(${i});">Delete</button></td>
                    </tr>
                `
            }
        }
    }
    else if(searchInput.placeholder == 'Search by Category'){
        for(let i = 0; i < data.length; i++){
            if(data[i].categroy.includes(value.toLowerCase())){
                newElement += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].categroy}</td>
                        <td>${data[i].totalPrice}</td>
                        <td><button onclick="updateData(${i});">Update</button></td>
                        <td><button onclick="deleteAtpos(${i});">Delete</button></td>
                    </tr>
                `
            }
        }
    }
    addNewE.innerHTML = (basicData + newElement);
}