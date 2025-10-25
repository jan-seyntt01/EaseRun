 const sizeButtons = document.querySelectorAll('.size-btn');

  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('active')) {
        button.classList.remove('active');
      } else {
        sizeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      }
    });
  });

  

  document.addEventListener('DOMContentLoaded', () => {
      const cartContainer = document.querySelector('.cart');
      const subtotalDisplay = document.querySelector('.checkout-summary span.fw-semibold');
      const totalDisplay = document.querySelector('.checkout-summary .fw-bold.fs-5:last-child');

      let cartData = JSON.parse(localStorage.getItem('cart')) || [];

      function updateTotals() {
        const subtotal = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
        subtotalDisplay.textContent = `₱${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
        totalDisplay.textContent = `₱${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
      }

      function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cartData));
      }

      // 🔧 Render Cart Items
      function renderCart() {
        cartContainer.innerHTML = '<h4 class="mb-4">Your Cart</h4>';

        if (cartData.length === 0) {
          cartContainer.innerHTML += `<p class="text-muted">Your cart is empty.</p>`;
          updateTotals();
          return;
        }

        cartData.forEach((item, index) => {
          const isKidsProduct = item.category === "kids";
          const sizeOptions = isKidsProduct ? ['27', '28', '29', '30-31', '32'] : ['38', '39', '40', '41', '42', '43'];
          const sizeButtonsHTML = sizeOptions.map(size =>
            `<button class="size-btn" data-size="${size}">${size}</button>`
          ).join("");

          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item', 'd-flex', 'align-items-center', 'p-3', 'mb-3', 'rounded');

          cartItem.innerHTML = `
            <div class="cart-item-image p-3">
              <img src="${item.image}" alt="Product Image" class="img-fluid rounded product-img">
            </div>

            <div class="cart-item-details flex-grow-1">
              <p class="cart-item-name mb-2 fw-semibold text-dark">${item.name}</p>
              <div class="cart-item-size text-dark mb-3">
                Size:
                <div class="size-buttons d-inline-flex gap-2 ms-2">
                  ${sizeButtonsHTML}
                </div>
              </div>

              <div class="cart-item-quantity d-flex align-items-end gap-2 pt-5">
                <button class="btn btn-outline-secondary btn-sm btn-decrease">-</button>
                <input type="text" class="form-control form-control-sm text-center quantity-input" style="width: 50px;" value="${item.quantity}">
                <button class="btn btn-outline-secondary btn-sm btn-increase">+</button>
              </div>
            </div>

            <div class="cart-item-remove d-flex flex-column align-items-end ms-3">
              <p class="cart-item-price mb-2 fw-bold">₱${(item.price * item.quantity).toLocaleString()}</p>
              <div class="remove-btn">Remove</div>
            </div>
          `;

          // Events
          const removeBtn = cartItem.querySelector('.remove-btn');
          const decreaseBtn = cartItem.querySelector('.btn-decrease');
          const increaseBtn = cartItem.querySelector('.btn-increase');
          const quantityInput = cartItem.querySelector('.quantity-input');
          const priceDisplay = cartItem.querySelector('.cart-item-price');

          // Handle Size Selection
          cartItem.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              cartItem.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              item.size = btn.dataset.size;
              saveCart();
            });
          });

          // Increase Quantity
          increaseBtn.addEventListener('click', () => {
            item.quantity++;
            quantityInput.value = item.quantity;
            priceDisplay.textContent = `₱${(item.price * item.quantity).toLocaleString()}`;
            saveCart();
            updateTotals();
          });

          // Decrease Quantity
          decreaseBtn.addEventListener('click', () => {
            if (item.quantity > 1) item.quantity--;
            quantityInput.value = item.quantity;
            priceDisplay.textContent = `₱${(item.price * item.quantity).toLocaleString()}`;
            saveCart();
            updateTotals();
          });

          // Remove Item
          removeBtn.addEventListener('click', () => {
            cartData.splice(index, 1);
            saveCart();
            renderCart();
          });

          cartContainer.appendChild(cartItem);
        });

        updateTotals();
      }

      renderCart();
    });

    // ✅ Checkout Popup Logic
    const checkoutBtn = document.querySelector('.checkout-btn');
    const popup = document.getElementById('popup-message');
    const closePopup = document.getElementById('close-popup');

    checkoutBtn.addEventListener('click', () => {
      popup.style.display = 'flex';
    });

    closePopup.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });