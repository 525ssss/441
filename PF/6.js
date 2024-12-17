// Curry Shen Chenlingjun
const addButtons = document.querySelectorAll('.add');
const cartTable = document.getElementById('cart-table');
const cartTotal = document.getElementById('cart-total');

function updateTotalPrice() {
  let total = 0;
  cartTable.querySelectorAll('tr').forEach(row => {
    const price = parseFloat(row.querySelector('td:nth-child(3)').textContent.replace('$', ''));
    if (!isNaN(price)) {
      total += price;
    }
  });
  cartTotal.textContent = total.toFixed(2);
}

addButtons.forEach(button => {
  button.addEventListener('click', function () {
    const priceElement = this.parentNode.querySelector('p');
    const quantityInput = this.parentNode.querySelector('.quantity-input');
    const price = parseFloat(priceElement.textContent.replace('$', ''));
    const quantity = parseInt(quantityInput.value, 10);

    // 检查价格和数量是否为有效数字
    if (isNaN(price) || isNaN(quantity) || quantity <= 0) {
      alert('Invalid price or quantity.');
      return; // 终止函数执行
    }

    const total = price * quantity;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${this.parentNode.querySelector('h2').textContent}</td>
      <td>${quantity}</td>
      <td>$${total.toFixed(2)}</td>
      <td class="remove">remove</td>
    `;
    cartTable.appendChild(row);

    updateTotalPrice();

    // Add event listener for remove button
    const removeButton = row.querySelector('.remove');
    removeButton.addEventListener('click', function () {
      cartTable.removeChild(row);
      updateTotalPrice();
    });
  });
});

function clearCart() {
  cartTable.innerHTML = '';
  updateTotalPrice(); // Update total price after clearing cart
}

// Assuming these functions are defined elsewhere
function submit() {
  alert(`Total amount to pay: $${updateTotalPrice()}`);
}

function clear() {
  clearCart();
}

document.getElementById('login-btn').addEventListener('click', function () {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username && password) {
    window.location.href = 'https://525ssss.github.io/441/PF/tk.html'
  } else {
    alert('Invalid username or password');
  }
});

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/; Secure; HttpOnly';
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; max-age=0';
}

function addTask() {
  const taskInput = document.getElementById('new-task');
  const newTask = taskInput.value.trim();
  if (newTask) {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');
    listItem.textContent = newTask;
    listItem.onclick = function () {
      this.classList.toggle('completed');
    };
    taskList.appendChild(listItem);
    taskInput.value = '';
  } else {
    alert('Please enter a task.');
  }
}

document.getElementById('task-list').addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
    event.target.parentNode.remove();
  }
});

function addDeleteButton(taskItem) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function () {
    taskItem.remove();
  };
  taskItem.appendChild(deleteButton);
}

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '';
let operator = null;
let firstOperand = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (isNaN(value) && value !== '.') {
      handleOperator(value);
    } else {
      handleNumber(value);
    }
  });
});

function handleNumber(value) {
  currentInput += value;
  display.value = currentInput;
}

function handleOperator(value) {
  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else {
    const result = performCalculation(operator, firstOperand, parseFloat(currentInput));
    display.value = result;
    firstOperand = result;
  }
  operator = value;
  currentInput = '';
}

function performCalculation(operator, a, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return;
  }
}

function validateForm() {
  let hasError = false;
  let errorMessages = '';
  const name = document.forms['enquiryForm']['name'].value;
  if (!name) {
    hasError = true;
    errorMessages += 'Please enter your name.\n';
  }

  const email = document.forms['enquiryForm']['email'].value;
  if (!email) {
    hasError = true;
    errorMessages += 'Please enter your email.\n';
  } else {
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      hasError = true;
      errorMessages += 'Please enter a valid email address.\n';
    }
  }

  if (hasError) {
    alert(errorMessages);
    return false;
  }
  return true;
}

var loginBtn = document.getElementById('login-btn');
console.log(loginBtn);
if (loginBtn) {
  loginBtn.addEventListener('click', function () {});
} else {
  console.error('Element with ID "login-btn" not found');
}

function updateCartTable() {
  const cartTable = document.getElementById('cart-table');
  cartTable.innerHTML = '';
  Object.values(cartItems).forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button class="remove" data-id="${item.id}">Remove</button></td>
    `;
    cartTable.appendChild(row);
  });
}

function jumpFun() {
  console.log(getCookie('username'));
  const username = getCookie('username');
  if (username) {
    window.location.href = 'course.html';
  } else {
    alert('please log in first');
    setTimeout(() => {
      window.location.href = 'index1.html';
    }, 500);
  }
}

function submitForm(event) {
  event.preventDefault();
  if (validateForm()) {
    window.location.href = 'login.html';
  }
}

function logout() {
  // 清除cookie或会话，这里以清除cookie为例
  const cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
  
  // 重定向到首页或登录页面
  window.location.href = 'index.html';
}