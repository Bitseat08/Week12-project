let title = document.getElementById("title");
let Price = document.getElementById("Price");
let total = document.getElementById("total");
let Count = document.getElementById("Count");
let Category = document.getElementById("Category");
let submit = document.getElementById("submit");
// Make two mood one for Creat & another for Update 
let mood = "Create";
let Tmp;

// Get Total
function getTotal(){
    if(Price.value != ""){
      
    }else{
        total.innerHTML = "";
       
    }
}

    
/* Create Product &
 Save Localstorage */

let DataProduct;
if(localStorage.product != null){
    DataProduct = JSON.parse(localStorage.product)
}else{
    DataProduct = [];
}


submit.onclick = function(){
    let NewProduct = {
        title:title.value,
        Price:Price.value,
        total:total.innerHTML,
        Count:Count.value,
        Category:Category.value,
    }

    // Count
    if(mood === "Create"){
       if (NewProduct.Count > 1){
        for(let i =0; i < NewProduct.Count;i++){
            DataProduct.push(NewProduct);
        }
    }else{
        DataProduct.push(NewProduct);
    } 
    }else{
        DataProduct[Tmp] = NewProduct;
        mood = "Create";
        submit.innerHTML = "Create";
        Count.style.display = "block";
    }

    
    

    // Save Localstorage
    localStorage.setItem("product",JSON.stringify(DataProduct))


    ClearData()
    ShowData()
}





// Clear Inputs

function ClearData(){
    title.value='';
    Price.value='';
    Count.value='';
    Category.value='';

}
// Read

function ShowData(){
    getTotal()
    let table = '';
    for(let i = 0; i < DataProduct.length;i++){
        table += `
        <tbody>
        <td>${i}</td>
        <td>${DataProduct[i].title}</td>
        <td>${DataProduct[i].Price}</td>
        <td>${DataProduct[i].taxes}</td>
        <td>${DataProduct[i].Category}</td>
        <td><button onclick="UpdateData(${i})" id="update">Update</button></td>
        <td><button onclick="DeleteData(${i})" id="delet">Delete</button></td>
        </tbody>
        `
    }
    document.getElementById("tbody").innerHTML = table;
    let BtnDeleteAll = document.getElementById("DeleteAll");
    if(DataProduct.length > 0){
        BtnDeleteAll.innerHTML = `
        <button onclick="DeleteAll()">Delete All</button>
        `
    }else{
        BtnDeleteAll.innerHTML =""; 
    }
} 
ShowData()


// Delete
function DeleteData(i){
    DataProduct.splice(i,1);
    localStorage.product = JSON.stringify(DataProduct);
    ShowData()
}

function DeleteAll(){
    localStorage.clear()
    DataProduct.splice(0)
    ShowData()
}





// Update
function UpdateData(i){
    title.value = DataProduct[i].title;
    Price.value = DataProduct[i].Price;
    
    getTotal()
    Count.style.display = "none";
    Category.value = DataProduct[i].Category;
    submit.innerHTML = "Update";
    mood = "Update";
    Tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}



// Search

let SearchMood = "title";

function GetSearchMoood(id)
{
    let search = document.getElementById("search");
    
    }
    search.focus()


function SearchData(value)
{
    let table = '';
    if(SearchMood == "title")
    {
        for(let i =0; i < DataProduct.length;i++){
            if(DataProduct[i].title.includes(value)){
                table += `
                        <tbody>
                        <td>${i}</td>
                        <td>${DataProduct[i].title}</td>
                        <td>${DataProduct[i].Price}</td>
                        <td>${DataProduct[i].total}</td>
                        <td>${DataProduct[i].Category}</td>
                        <td><button onclick="UpdateData(${i})" id="update">Update</button></td>
                        <td><button onclick="DeleteData(${i})" id="delet">Delete</button></td>
                        </tbody>
                        `
            }
        }
    }else{
        for(let i =0; i < DataProduct.length;i++){
            if(DataProduct[i].Category.includes(value)){
                table += `
                        <tbody>
                        <td>${i}</td>
                        <td>${DataProduct[i].title}</td>
                        <td>${DataProduct[i].Price}</td>
                        <td>${DataProduct[i].total}</td>
                        <td>${DataProduct[i].Category}</td>
                        <td><button onclick="UpdateData(${i})" id="update">Update</button></td>
                        <td><button onclick="DeleteData(${i})" id="delet">Delete</button></td>
                        </tbody>
                        `}

    }
    
}
document.getElementById("tbody").innerHTML = table;
}

