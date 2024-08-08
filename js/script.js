// Set the date for the end of the deal (3 days from now)
var endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

// Update the countdown every second
var countdownInterval = setInterval(
  function() {
      var now = new Date().getTime();
      var distance = endDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the countdown
      document.getElementById("days").innerHTML = formatTime(days);
      document.getElementById("hours").innerHTML = formatTime(hours);
      document.getElementById("minutes").innerHTML = formatTime(minutes);
      document.getElementById("seconds").innerHTML = formatTime(seconds);

      // If the countdown is over, display a message
      if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById("days").innerHTML = "00";
      document.getElementById("hours").innerHTML = "00";
      document.getElementById("minutes").innerHTML = "00";
      document.getElementById("seconds").innerHTML = "00";
      }
  }, 1000
);

// Helper function to add leading zeros to single digit numbers
function formatTime(time) {
  return time < 10 ? "0" + time : time;
}
// End of DOTW timer counter

// ============Shopping cart badge and ADD TO CART FUNCTIONS ==============

// --------------------------------------------
// Function to update cart icon badge
function updateCartBadge(quantity) {
  document.getElementById('cart-badge').innerText = quantity;
}

// Function to add event listeners to "Add to Cart" buttons
function setupAddToCartButtons() {
  var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(function(button) {
      button.addEventListener('click', function() {
          var itemName = button.dataset.name;
          var itemPrice = parseFloat(button.dataset.price);
          var itemImage = button.parentNode.querySelector('.product_img img').getAttribute('src'); // Get the image URL
          var cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
          var item = {
              name: itemName,
              price: itemPrice,
              image: itemImage
          };
          cartItems.push(item);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          displayCart(); // Update the displayed cart
          // Update cart badge
          var cartQuantity = cartItems.length;
          updateCartBadge(cartQuantity);
      });
  });
}

// Function to display cart items
function displayCart() {
  var cartItems = JSON.parse(localStorage.getItem('cartItems'));
  var cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = ''; // Clear previous contents

  if (cartItems && cartItems.length > 0) {
      cartItems.forEach(function(item) {
          var cartItemHtml = `
              <div class="cart-item">
                  <img src="${item.image}" alt="${item.name}" style="max-width: 100px;">
                  <div>${item.name}</div>
                  <div>$${item.price.toFixed(2)}</div>
                  <button onclick="deleteItem('${item.name}')">Delete</button>
              </div>
          `;
          cartContainer.innerHTML += cartItemHtml;
      });
      // Optionally display total price after the Clear Cart button
      var totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
      cartContainer.innerHTML += <p style="margin-top: 20px; background-color: green; color: white; font-size:18px; text-align: center"><b>Total Price: $${totalPrice.toFixed(2)}</b></p>;
  } else {
      cartContainer.innerHTML = '<p>No items in the cart</p>';
  }
}

// Function to delete an item from the cart
function deleteItem(name) {
  var cartItems = JSON.parse(localStorage.getItem('cartItems'));
  if (cartItems) {
      var index = cartItems.findIndex(item => item.name === name);
      if (index !== -1) {
          cartItems.splice(index, 1);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          displayCart(); // Update displayed cart
          updateCartBadge(cartItems.length); // Update cart badge
      }
  }
}

// Function to clear the entire cart
function clearCart() {
  localStorage.removeItem('cartItems');
  displayCart(); // Update the displayed cart
  updateCartBadge(0); // Update cart badge to zero
}

// Call setupAddToCartButtons initially to set up event listeners
setupAddToCartButtons();

// Call displayCart initially to load any existing items in the cart
displayCart();


// --------------------------------------------

function togglePaymentFields() {
var paymentMethod = document.getElementById("payment-method").value;
var creditCardFields = document.getElementById("credit-card-fields");
var paypalFields = document.getElementById("paypal-fields");
var googlePayFields = document.getElementById("google-pay-fields");

// Hide all payment method-specific fields
creditCardFields.style.display = "none";
paypalFields.style.display = "none";
googlePayFields.style.display = "none";

// Show fields specific to the selected payment method
if (paymentMethod === "credit-card") {
  creditCardFields.style.display = "block";
} else if (paymentMethod === "paypal") {
  paypalFields.style.display = "block";
} else if (paymentMethod === "google-pay") {
  googlePayFields.style.display = "block";
}
// Implement logic for other payment methods if needed
}
// ==================================================================