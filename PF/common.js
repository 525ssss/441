document.addEventListener('DOMContentLoaded', function() {
  const addButtons = document.querySelectorAll('.add');
  const cartTable = document.getElementById('cart-table');
  const cartTotal = document.getElementById('cart-total');
  let totalPrice = 0;

  function updateTotalPrice() {
    let total = 0;
    cartTable.querySelectorAll('tr').forEach((row) => {
      const currentPrice = parseFloat(row.querySelector('td:last-child').textContent.replace('$', ''));
      total += currentPrice;
    });
    cartTotal.textContent = total.toFixed(2);
    return total;
  }

  function addToCart(course, price, quantity) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${course}</td>
      <td>${quantity}</td>
      <td>$${(price * quantity).toFixed(2)}</td>
      <td class="remove">remove</td>
    `;
    cartTable.appendChild(row);
    updateTotalPrice();
    row.querySelector('.remove').addEventListener('click', function() {
      cartTable.removeChild(row);
      updateTotalPrice();
      removeCookie(course);
    });
    setCookie(course, price, quantity);
  }

  function setCookie(course, price, quantity) {
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000*30)); // 设置cookie有效期为30天
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${course}=${price}_${quantity};${expires};path=/`;
  }

  function getCookie(name) {
    let cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      let cookieName = cookie.split('=')[0];
      let cookieValue = cookie.split('=')[1];
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return '';
  }

  function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }

  // Restore cart from cookies
  document.cookie.split('; ').forEach(function(cookie) {
    let cookieParts = cookie.split('=');
    if (cookieParts.length === 2) {
      let course = cookieParts[0];
      let priceAndQuantity = cookieParts[1].split('_');
      let price = parseFloat(priceAndQuantity[0]);
      let quantity = parseInt(priceAndQuantity[1], 10);
      addToCart(course, price, quantity);
    }
  });

  addButtons.forEach((button) => {
    button.addEventListener('click', function() {
      const course = this.parentNode.querySelector('h2').textContent;
      const price = parseFloat(this.parentNode.querySelector('p').textContent);
      const quantity = parseInt(this.parentNode.querySelector('.quantity-input').value, 10);
      addToCart(course, price, quantity);
    });
  });
  function jumpFun() {
    // 跳转到Courseware页面
    window.location.href = 'courseware.html';
  }
  function checkout() {
    alert(`Total amount to pay: $${updateTotalPrice()}`);
    // Additional checkout logic can be added here
  }

  function clearCart() {
    cartTable.innerHTML = '';
    cartTotal.textContent = '0.00';
    document.cookie.split('; ').forEach(function(cookie) {
      let cookieParts = cookie.split('=');
      if (cookieParts.length === 2) {
        let course = cookieParts[0];
        removeCookie(course);
      }
    });
  }

  function validateForm(form) {
    let hasError = false;
    let errorMessages = "";

    let name = form.name.value;
    if (!name) {
      hasError = true;
      errorMessages += "Please enter your name.\n";
    }

    let email = form.email.value;
    if (!email) {
      hasError = true;
      errorMessages += "Please enter your email.\n";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      hasError = true;
      errorMessages += "Please enter a valid email address.\n";
    }

    if (hasError) {
      alert(errorMessages);
      return false;
    }
    return true;
  }
});