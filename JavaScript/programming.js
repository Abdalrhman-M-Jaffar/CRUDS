// Variables
let title = document.getElementById('title');
let price = document.getElementById('price');
let tax = document.getElementById('tax');
let discount = document.getElementById('discount');
let totalPrice = document.getElementById('total');
let totalDesign = document.getElementById('total-design');
let count = document.getElementById('count');
let category = document.getElementById('category');
let searchByTitle = document.getElementById('searchT');
let searchByCategory = document.getElementById('searchC');
let objectCount = document.getElementById('objects-count');
let deleteBtn = document.getElementById('delete-btn');
let ID = 1;
let obCounter = 0;

// Creating the Object

let infTable = document.getElementById('table-inf');
let constTableInf = document.getElementById('const-inf-value');
let information = ({
    titleName: title.value,
    price$: price.value,
    taxes: tax.value,
    disc: discount.value,
    Tprice: totalPrice.innerHTML,
    cate: category.value,
})

var tr;
var tdID;
var tdTitle;
var tdCategory;
var tdTPrice;
var tdUpdateBtn;
var tdDeleteBtn;
var btnForUpdate;
var btnForDelete;

// <tr> <td>ID.value</td> .. <td>title.value</td> .. <td>ID.value</td> .... etc

// Printing the object

function create(){

    if(title.value.length > 0 && price.value.length > 0 && tax.value.length > 0 && discount.value.length >= 0 && count.value.length > 0 && category.value.length > 0){

        for(let i = 1; i <= count.value; i++){
            information = new Object({
                titleName: title.value,
                price$: price.value,
                taxes: tax.value,
                disc: discount.value,
                Tprice: totalPrice.innerHTML,
                cate: category.value,
            });

            // Crating the Element

            tr = document.createElement("tr");
            tdID = document.createElement("td");
            tdTitle = document.createElement("td");
            tdCategory = document.createElement("td");
            tdTPrice = document.createElement("td");
            tdUpdateBtn = document.createElement("td");
            tdDeleteBtn = document.createElement("td");
            btnForUpdate = document.createElement("button");
            btnForDelete = document.createElement("button");

            // giving the value

            tdID.innerHTML = ID;
            tdTitle.innerHTML = information.titleName;
            tdCategory.innerHTML = information.cate;
            tdTPrice.innerHTML = information.Tprice;

            btnForUpdate.innerHTML = 'Update';
            btnForDelete.innerHTML = 'Delete';

            // Adding the E

            tdUpdateBtn.append(btnForUpdate);
            tdDeleteBtn.append(btnForDelete);
            tr.append(tdID, tdTitle, tdCategory, tdTPrice, tdUpdateBtn, tdDeleteBtn);
            infTable.append(tr);

            obCounter++;

            console.log(infTable, information, obCounter);
        }

        if(obCounter > 0){
            deleteBtn.style.cssText = `display: flex;`;
            objectCount.innerHTML = obCounter;
        }
        else{
            deleteBtn.style.cssText = `display: none;`;
        }

        // reset

        title.value = '';
        price.value = '';
        tax.value = '';
        discount.value = '';
        totalPrice.innerHTML = '';
        category.value = '';
        count.value = '';
        totalDesign.style.cssText = `background-color: #ff6464;`;
    }
}

// conditoins

function totalTrueCond(){
    if(price.value.length > 0 && tax.value.length > 0 && price.value >= 0 && tax.value >= 0){
        totalPrice.innerHTML = +price.value + (price.value * (tax.value / 100)) - (price.value * (discount.value / 100));
        totalDesign.style.cssText = `background-color: #64ff96`;
    }
}

function deleteAll(){
    infTable.replaceChildren(constTableInf);
    obCounter = 0;
    if(obCounter == 0){
        deleteBtn.style.cssText = `display: none;`;
    }
    console.log(obCounter);
}