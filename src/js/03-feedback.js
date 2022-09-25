import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
import { save, load, remove } from './storage';

onPageLoading();

function onFormInput(event) {
  const { name, value } = event.target;
  let savedFormData = load(STORAGE_KEY);
  savedFormData = savedFormData ? savedFormData : {};
  savedFormData[name] = value;
  save(STORAGE_KEY, savedFormData);
}

formRef.addEventListener('input', throttle(onFormInput, 500));

function onPageLoading() {
  const savedFormData = load(STORAGE_KEY);
  if (!savedFormData) {
    return;
  }
  Object.entries(savedFormData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}
function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  remove(STORAGE_KEY);
}

formRef.addEventListener('submit', onFormSubmit);
