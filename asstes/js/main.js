// form inputs

let title = document.getElementById('title')
let price = document.getElementById('price')
let tax = document.getElementById('tax')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let create_btn = document.getElementById('create-btn')
let total_parent = document.getElementById('total-parent')
let delete_btn = document.getElementById('delete-btn')
let delete_items = document.getElementById('delete-items')
let mood = "create"
let falg;
//create product with local storage
let product_data;
if(localStorage.product != null){
    product_data = JSON.parse(localStorage.product)
}
else{
    product_data = []
}


// form validation

create_btn.onclick = function validation(e){
    function check(name){
        e.preventDefault()
        alert(`please enter ${name}`)
    }

    if(title.value == ''){
        check('title')
    }
    else if(price.value ==''){
        check('price')
    }

    else if(tax.value == '')[
        check('tax')
    ]
    else if(category.value == ''){
        check('category')
    }
    else if(count.value <0 ){
        e.preventDefault()
        alert("count shouldn't be negative")
    }
    else{
        let new_pro = {
            title:title.value,
            price:price.value,
            tax:tax.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value

        }
        if(mood === "create"){
            if(+new_pro.count > 1){

                for(x=0;x< +new_pro.count;x++){
                    product_data.push(new_pro)
                }
                    
            }
            else{
                product_data.push(new_pro)
            }
        }
        else{
            product_data[falg] = new_pro
            mood = "create"
            create_btn.value ="create"
            count.style.display="block"
        }
        localStorage.setItem('product', JSON.stringify(product_data))
        //clear input after add it
        showData()
        cleardata()
    }


}

// total func
function get_total(){
    if(price.value != '' && tax.value!=''){
        total.innerHTML= +price.value + +tax.value
        total_parent.style.background="#3a4"
    }

    if(price.value == '' || tax.value == ''){
        total.innerHTML=''
        total_parent.style.background="red"

    }
    if(discount.value != '' && price.value != '' && tax.value!=''){
        total.innerHTML= +price.value + +tax.value - +discount.value
    }
    if(total.innerHTML <=0){
        total_parent.style.background="red"
    }
}

// clear data

function cleardata(){
    title.value = ''
    price.value = ''
    tax.value = ''
    discount.value = ''
    category.value = ''
    count.value = ''
    total.innerHTML=''
    total_parent.style.background="red"
}
//read

function showData(){
    let table = ''
    for(i=0;i<product_data.length;i++){
        table +=`
        <tr>
        <td>${i+1}</td>
        <td>${product_data[i].title}</td>
        <td>${product_data[i].price}</td>
        <td>${product_data[i].tax}</td>
        <td>${product_data[i].discount}</td>
        <td>${product_data[i].total}</td>
        <td>${product_data[i].category}</td>
        <td><button onclick="updateDate(${i})" id="update">update</button></td>
        <td><button onclick="Deleteitem( ${i} )" id="delete">Delete</button></td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table 
    delete_items.innerHTML= +i
    if(delete_items.innerHTML == 0){
        delete_btn.style.display="none"
        localStorage.clear()
    }
    else if(delete_items.innerHTML > 0){
        delete_btn.style.display="block"
    }
}

showData()
let update_btn = document.getElementById('update')
//count

//delete one item only

function Deleteitem(i){
    product_data.splice(i,1)
    localStorage.product = JSON.stringify(product_data);
    showData()
    delete_items.innerHTML-= +i
}

// delete all data
delete_btn.onclick = function(){
    product_data.splice(0,product_data.length)
    localStorage.product = JSON.stringify(product_data)
    localStorage.clear()
    showData()
}

//update
function updateDate(i){
    title.value = product_data[i].title
    price.value = product_data[i].price
    tax.value = product_data[i].tax
    discount.value = product_data[i].discount
    category.value = product_data[i].category
    count.style.display ="none"
    create_btn.value = "update"
    mood = "update"
    get_total()
    falg = i
    scroll({
        top:0,behavior:'smooth'
    })
}
//search
let searchmood = "title";

function getSearchMode(id){
    let search = document.getElementById('search')
    if(id == "search-by-title"){
        searchmood = "title"
        search.placeholder = "search by title"
    }else{
        searchmood = "category"
        search.placeholder = "search by category"
    }
    search.focus()
} 


function searchData(value){
    if(searchmood == "title"){
        let table = '';
        for(i=0;i<product_data.length ; i++){
            if(product_data[i].title.includes(value)){
                table +=`
                <tr>
                <td>${i+1}</td>
                <td>${product_data[i].title}</td>
                <td>${product_data[i].price}</td>
                <td>${product_data[i].tax}</td>
                <td>${product_data[i].discount}</td>
                <td>${product_data[i].total}</td>
                <td>${product_data[i].category}</td>
                <td><button onclick="updateDate(${i})" id="update">update</button></td>
                <td><button onclick="Deleteitem( ${i} )" id="delete">Delete</button></td>
            </tr>
                `           
                document.getElementById('tbody').innerHTML = table
            }

        }
    }
}