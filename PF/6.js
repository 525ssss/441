//Curry Shen Chenlingjun
const addButtons = document.querySelectorAll('.add');
const cartTable = document.getElementById('cart-table');
const cartTotal = document.getElementById('cart-total');
let totalPrice = 0;

function updateTotalPrice() {
  const tr = cartTable.getElementsByTagName('tr');
  let total = 0;
  if (tr.length === 0) {
    cartTotal.innerHTML = total.toFixed(2);
    return total.toFixed(2);
  }
  for (let index = 0; index < tr.length; index++) {
    const element = tr[index];
    const currentPrice = element.getElementsByTagName('td')[2].innerHTML.replace('$', '');
    total += Number(currentPrice);
    cartTotal.innerHTML = total.toFixed(2);
  }
  return total.toFixed(2);
}

addButtons.forEach((button, index) => {
  button.addEventListener('click', function () {
    const course = this.parentNode.querySelector('h2').textContent;
    const price = parseInt(this.parentNode.querySelector('p').textContent);
    const quantity = parseInt(this.parentNode.querySelector('.quantity-input').value);
    const total = price * quantity;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${course}</td>
      <td>${quantity}</td>
      <td>$${total.toFixed(2)}</td>
      <td class="remove" data-index="${index}">remove</td>
    `;
    cartTable.appendChild(row);

    updateTotalPrice();

    const removes = cartTable.getElementsByClassName('remove');
    for (let i = 0; i < removes.length; i++) {
      const remove = removes[i];
      remove.addEventListener('click', function (event) {
        cartTable.removeChild(this.parentNode);
        updateTotalPrice();
      });
    }
  });
});

function checkout() {
  alert(`Total amount to pay: $${updateTotalPrice()}`);
}

function clearCart() {
  cartTable.innerHTML = '';
  totalPrice = 0;
  cartTotal.textContent = totalPrice.toFixed(2);
}

document.getElementById('login-btn').addEventListener('click', function () {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username && password) {
    window.location.href = 'https://525ssss.github.io/441/PF/index1.html';
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

function junpFun() {
  console.log(getCookie('username'));
  const username = getCookie('username');
  if (username) {
    window.location.href = 'courseware.html';
  } else {
    alert('Not logged in yet, please log in first');
    setTimeout(() => {
      window.location.href = 'index1.html';
    }, 500);
  }
}

function submitForm(event) {
  event.preventDefault();
  if (validateForm()) {
    window.location.href = 'thankyou.html';
  }
}
