import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};

const form_e_m = document.querySelector('.feedback-form');

form_e_m.addEventListener('input', throttle(storageFormData, 500));
form_e_m.addEventListener('submit', onFormSubmit);

reloadPage();

function storageFormData(e_m) {
  formData[e_m.target.name] = e_m.target.value.trim();
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function onFormSubmit(e_m) {
  e_m.preventDefault();
  console.log(formData);
  e_m.currentTarget.reset();
  localStorage.removeItem(LOCAL_KEY);
  formData = {};
}

function reloadPage() {
  if (formData) {
    let { email, message } = form_e_m.elements;
    email.value = formData.email || '';
    message.value = formData.message || '';
  }
}
