if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready () {
    const removeCartItemButtons = document.getElementsByClassName("btn-danger");

    for (let i=0; i < removeCartItemButtons.length; i++){
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    const quantityInputs = document.getElementsByClassName('cart-quantity-input')

    for(let i=0; i < quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    const addToCartButton = document.getElementsByClassName('shop-item-btn')

    for(let i=0; i < addToCartButton.length; i++){
        let button = addToCartButton[i]
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseButtonClicked);

}

function purchaseButtonClicked() {
    
    const cartItems = document.getElementsByClassName('cart-items')[0]

    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }

    updateCartTotal();
    alert('Thank you for your purchase');
}



function addToCartClicked(event){
    const button = event.target;
    const shopItem = button.parentElement.parentElement;

    const shopItemTitle = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    const shopItemPrice = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    const shopItemImageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src
    
    addItemToCart(shopItemTitle, shopItemPrice, shopItemImageSrc);
    updateCartTotal();
}

function addItemToCart(shopItemTitle, shopItemPrice, shopItemImageSrc){
    const cartRow = document.createElement('div');
    const cartItems = document.getElementsByClassName('cart-items')[0]

    const cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(let i=0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == shopItemTitle){
            alert('This item is already added to the cart.');
            return
        }
    }


    cartRow.classList.add('cart-row')
    const cartRowContents = `
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${shopItemImageSrc}" width="100" heigh="100">
                        <span class="cart-item-title">${shopItemTitle}</span>
                    </div>
                    <span class="cart-price cart-column">${shopItemPrice}</span>
                    <div class="cart-quantity cart-column" >
                        <input class="cart-quantity-input" type="number" value = "1" name="quantity">
                        <button class="btn btn-danger" role="button">REMOVE</button>
                    </div>
    `
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}



function quantityChanged(event) {
    let input = event.target;

    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal()
}


function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal();
}




function updateCartTotal(){
    const cartItemContainer = document.getElementsByClassName("cart-items")[0];

    const cartRows = cartItemContainer.getElementsByClassName("cart-row");
    let totalPrice = 0;

    for (let i=0; i < cartRows.length; i++){
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

        let price = parseFloat(priceElement.innerText.replace('$',''))
        let quantity = quantityElement.value

        totalPrice += (price*quantity);
    }
    totalPrice = Math.round(totalPrice*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + totalPrice;
}