// setting supaya setiap width sama 
function widthElement(){
  let widthEl = Math.max(document.querySelector('.filter').offsetWidth, document.querySelector('.input-data').offsetWidth, document.querySelector('.product-data').offsetWidth)
  document.querySelector('.filter').setAttribute('style', `width: ${widthEl}px`)
  document.querySelector('.input-data').setAttribute('style', `width: ${widthEl}px`)
  document.querySelector('.product-data').setAttribute('style', `width: ${widthEl}px`)
}
widthElement()

// Inisiasi Data 
var products = [
  {
    id: 1579581080923,
    category: 'Fast Food',
    name: 'Noodle',
    price: 3500,
    stock: 9
  },
  {
    id: 1579581081130,
    category: 'Electronic',
    name: 'Headphone',
    price: 4300000,
    stock: 8
  },
  {
    id: 1579581081342,
    category: 'Cloth',
    name: 'Hoodie',
    price: 300000,
    stock: 7
  },
  {
    id: 1579581081577,
    category: 'Fruit',
    name: 'Apple',
    price: 10000,
    stock: 8
  }
]
var elForm = document.getElementById('formAddProduct')
var resetFilter = document.getElementById('resetFilter')
var elFilterName = document.getElementById('filterName')
var elFilterCategory = document.getElementById('filterCategory')
var elFilterPrice = document.getElementById('filterHighPrice')
// load data product 
window.addEventListener('load', getProducts(products), false);
// add product when form submit 
elForm.addEventListener('submit', addProduct, false);
// clear filter form 
resetFilter.addEventListener('click', clearFilter, false);
// filter by name 
elFilterName.addEventListener('keyup', filterByName, false);
// filter by category 
elFilterCategory.addEventListener('change', filterByCategory, false);
// filter by Price 
elFilterPrice.addEventListener('keyup', filterByPrice, false);
// Filter by Price Range 

function filterByPrice(){
  let priceLow = document.getElementById('filterLowPrice').value
  let priceHigh = document.getElementById('filterHighPrice').value
  // get product 
  let product = products.filter((val) => val.price >= priceLow && val.price <= priceHigh)
  // call function getProducts 
  getProducts(product)
}
// Filter by category 
function filterByCategory(){
  let category = document.getElementById('filterCategory').value
  // get Product 
  let product = category == 'All' ? products : products.filter((val) => val.category == category)
  // call function getProducts 
  getProducts(product)
}
// filter by name 
function filterByName(){
  let productName = document.getElementById('filterName').value.toLowerCase()
  // get Product
  let product = products.filter((val) => (val.name.toLowerCase()).includes(`${productName}`) == true)
  // call function getProducts 
  getProducts(product) 
}
// add data product 
function addProduct(e){
  e.preventDefault()
  // get input data 
  let product = inputData()
  // push data product to array 
  products.push({
    id: (Date.now()),
    category: product.category,
    name: product.productName,
    price: product.price,
    stock: product.stock
  })
  // Clear product form 
  clearForm()
  // get new list product 
  getProducts(products)
}
// get data product 
function getProducts(products){
  let result = ''
  products.forEach(el => {
    result += `<tr>
      <td>${el.id}</td>
      <td>${el.category}</td>
      <td>${el.name}</td>
      <td>${el.price}</td>
      <td>${el.stock}</td>
    </tr>`
  })
  document.querySelector('.product-data table tbody').innerHTML = result
}
// clear form add product 
function clearForm(){
  document.getElementById('name').value = ''
  document.getElementById('price').value = ''
  document.getElementById('stock').value = ''
  document.getElementById('category').selectedIndex = 0
}
// clear form filter 
function clearFilter(){
  // clear form filter
  document.getElementById('filterName').value = ''
  document.getElementById('filterLowPrice').value = ''
  document.getElementById('filterHighPrice').value = ''
  document.getElementById('filterCategory').selectedIndex = 0
  // show list product data 
  getProducts(products)
}
// get input data 
function inputData(){
  let productName = document.getElementById('name').value
  let price = parseInt(document.getElementById('price').value)
  let category = document.getElementById('category').value
  let stock = parseInt(document.getElementById('stock').value)
  return {productName, price, category, stock};
}