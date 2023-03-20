let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let submit = document.querySelector(".submit");
let search = document.querySelector(".search");
let alert = document.querySelector(".darck");
let alertH3 = document.querySelector(".alert h3");
let alertButton = document.querySelector(".alert button");

let mood = "create";
let tmp;
// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

// create product
let dataproduct;
if (localStorage.product != null) {
  dataproduct = JSON.parse(localStorage.product);
} else {
  dataproduct = [];
}
submit.onclick = function () {
  let newproduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (title.value != "" && price.value != "" && category.value != "" && newproduct.count <= 100) {
    if (mood === "create") {
      if (newproduct.count > 1) {
        for (let i = 0; i < newproduct.count; i++) {
          dataproduct.push(newproduct);
        }
      } else {
        dataproduct.push(newproduct);
      }
    } else {
      dataproduct[tmp] = newproduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }else{
    if(title.value == ""){
      alert.style.display = "block"
      alertH3.innerHTML = "Please write the address"
      sound.play()
    }
    if(price.value == ""){
      alert.style.display = "block"
      alertH3.innerHTML = "Please write the price"
      sound.play()
    }
    if(newproduct.count > 100){
      alert.style.display = "block"
      alertH3.innerHTML = "Please limit the numper to 100"
      sound.play()
    }
    if(category.value == ""){
      alert.style.display = "block"
      alertH3.innerHTML = "Please write the category"
      sound.play()
    }
  
    alertButton.addEventListener("click" , ()=>{
      alert.style.display = "none"
    })
  } 

  localStorage.setItem("product", JSON.stringify(dataproduct));

  showData();
};

// sound
let sound = new Audio();
sound.src = "sound/mmm.mp3"
// clear data
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataproduct.length; i++) {
    table += `
   
  <tr>
  <td>${i + 1}</td>
  <td>${dataproduct[i].title}</td>
  <td>${dataproduct[i].price}</td>
  <td>${dataproduct[i].taxes}</td>
  <td>${dataproduct[i].ads}</td>
  <td>${dataproduct[i].discount}</td>
  <td>${dataproduct[i].total}</td>
  <td>${dataproduct[i].category}</td>
  <td><button onclick="updateData(${i})" class="update">update</button></td>
  <td><button onclick="deletedata(${i})" class="delete">delete</button></td>
  </tr>

  `;
  }

  document.querySelector(".tbody").innerHTML = table;
  let btndelete = document.querySelector(".deleteAll");
  if (dataproduct.length > 0) {
    btndelete.innerHTML = `
  <button onclick="deleteAll()">delete All (${dataproduct.length})</button>
  `;
  } else {
    btndelete.innerHTML = "";
  }
}
showData();

// delete data
function deletedata(i) {
  dataproduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataproduct);
  showData();
}
// delete All
function deleteAll() {
  localStorage.clear();
  dataproduct.splice(0);
  showData();
}

// update Data
function updateData(i) {
  title.value = dataproduct[i].title;
  price.value = dataproduct[i].price;
  taxes.value = dataproduct[i].taxes;
  ads.value = dataproduct[i].ads;
  discount.value = dataproduct[i].discount;
  category.value = dataproduct[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";
function getSearchMood(id) {
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}
// search data
function searchdata(value) {
  let table = "";

  for (let i = 0; i < dataproduct.length; i++) {
    if (searchMood == "title") {
      if (dataproduct[i].title.includes(value.toLowerCase())) {
        table += `
   
      <tr>
      <td>${i + 1}</td>
      <td>${dataproduct[i].title}</td>
      <td>${dataproduct[i].price}</td>
      <td>${dataproduct[i].taxes}</td>
      <td>${dataproduct[i].ads}</td>
      <td>${dataproduct[i].discount}</td>
      <td>${dataproduct[i].total}</td>
      <td>${dataproduct[i].category}</td>
      <td><button onclick="updateData(${i})" class="update">update</button></td>
      <td><button onclick="deletedata(${i})" class="delete">delete</button></td>
      </tr>
    
      `;
      }
    } else {
      if (dataproduct[i].category.includes(value.toLowerCase())) {
        table += `
   
      <tr>
      <td>${i + 1}</td>
      <td>${dataproduct[i].title}</td>
      <td>${dataproduct[i].price}</td>
      <td>${dataproduct[i].taxes}</td>
      <td>${dataproduct[i].ads}</td>
      <td>${dataproduct[i].discount}</td>
      <td>${dataproduct[i].total}</td>
      <td>${dataproduct[i].category}</td>
      <td><button onclick="updateData(${i})" class="update">update</button></td>
      <td><button onclick="deletedata(${i})" class="delete">delete</button></td>
      </tr>
    
      `;
      } else {
      }
    }
  }
  document.querySelector(".tbody").innerHTML = table;
}


let body = document.querySelector("body");
let icon = document.querySelector(".icon");
let toggle = document.querySelector("#toggle");

// console.log("body class name " + body.className)
// console.log("theme " + localStorage.getItem("theme"))

if (localStorage.getItem("theme") == "light") {

  icon.innerHTML = '<i id="toggle" class="fa-solid fa-moon"></i>'
  body.classList.add("light")

} else {
  icon.innerHTML = '<i id="toggle" class="fa-solid fa-sun"></i>'
  body.classList.remove("light")

}

function getcolor() {
  icon.addEventListener("click", () => {
    // console.log(localStorage.getItem("theme"))

    body.classList.toggle("light")

    if (body.className == "light") {
      icon.innerHTML = '<i id="toggle" class="fa-solid fa-moon"></i>'
      localStorage.setItem("theme", "light")
    } else {
      icon.innerHTML = '<i id="toggle" class="fa-solid fa-sun"></i>'
      localStorage.setItem("theme", "dark")
    }

    console.log("body class name " + body.className)
    console.log("theme " + localStorage.getItem("theme"))
  })
}
getcolor()