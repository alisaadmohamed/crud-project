



var ProductNameInput = document.getElementById("ProductNameInput");
var productNameAlert = document.getElementById("productNameAlert");
var ProductPriceInput = document.getElementById("ProductPriceInput");
var ProductCategoryInput = document.getElementById("ProductCategoryInput");
var ProductDescriptionInput = document.getElementById("ProductDescriptionInput");

var productContainer;




function validateProductName()
{

	var regex =/^[A-Z][a-z]{3,8}$/
	
	if(regex.test(ProductNameInput.value) == true) {
		productNameAlert.classList.replace("d-block" ,"d-none")
		ProductNameInput.classList.add("is-valid")
		ProductNameInput.classList.remove("is-invalid")
		return true;
	}
	 else
	 {
		productNameAlert.classList.replace("d-none" ,"d-block")
		ProductNameInput.classList.add("is-invalid")
		ProductNameInput.classList.remove("is-valid")
		return false;
	}
};

ProductNameInput.addEventListener("keyup" , validateProductName);




if(localStorage.getItem("myProduct") == null)
{
	productContainer = [];  //newCustomer
} else{
	productContainer =  JSON.parse( localStorage.getItem("myProduct"));  // oldCustomer
	displayProduct()

}

function addProduct()
{
	
if(validateProductName() == true) {
	var product = {
		name:ProductNameInput.value,
		price:ProductPriceInput.value,
		Category:ProductCategoryInput.value,
		Description:ProductDescriptionInput.value
		}
	
		productContainer.push(product);
		localStorage.setItem("myProduct" , JSON.stringify(productContainer));
		displayProduct()
		clearForm();
		console.log(productContainer);
}


}

function clearForm()
{
ProductNameInput.value = "";
ProductPriceInput.value = "";
ProductCategoryInput.value = "";
ProductDescriptionInput.value = "";

}


function displayProduct()
{
	var cartona ="";

	for(var i =0 ; i <productContainer.length ; i++) {

		cartona +=`<tr>
		<td>${i+1}</td>
		<td>${productContainer[i].name}</td>
		<td>${productContainer[i].price}</td>
		<td>${productContainer[i].Category}</td> 
		<td>${productContainer[i].Description}</td>
		<td> <button onclick="updateProduct(${i})" class="btn btn-outline-warning" >update</button> </td>
		<td>  <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button>  </td>
	</tr>
	`;


	}
	document.getElementById("myTable").innerHTML = cartona;

};


function deleteProduct(productIndex)
{


	productContainer.splice(productIndex,1);
	localStorage.setItem("myProduct", JSON.stringify(productContainer))
	displayProduct();


}


function searchProduct(searchTerm)
{

	var cartona = "";

for(var i =0 ; i<productContainer.length ; i++ ) {

	if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())||productContainer[i].Category.toLowerCase().includes(searchTerm.toLowerCase())) {

		cartona +=`<tr>
		<td>${i+1}</td>
		<td>${productContainer[i].name}</td>
		<td>${productContainer[i].price}</td>
		<td>${productContainer[i].Category}</td> 
		<td>${productContainer[i].Description}</td>
		<td> <button class="btn btn-outline-warning" >update</button> </td>
		<td>  <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button>  </td>
	</tr>
	`;


		
	} else {
		console.log("NotAval")
	}
}
document.getElementById("myTable").innerHTML = cartona;
}



function updateProduct(productIndex)
{
	ProductNameInput.value = productContainer[productIndex].name;
	ProductPriceInput.value = productContainer[productIndex].price;
	ProductCategoryInput.value = productContainer[productIndex].Category;
	ProductDescriptionInput.value = productContainer[productIndex].Description;
};

 
