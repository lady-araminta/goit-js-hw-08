import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const savedFormData = {};

onPageLoading();

function onFormInput(event) {
  const { name, value } = event.target;
  try {
    let savedFormData = localStorage.getItem(STORAGE_KEY);
    if (savedFormData) {
      savedFormData = JSON.parse(savedFormData);
    } else {
      savedFormData = {};
    }
    savedFormData[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFormData));
  } catch (error) {
    console.log(error);
  }
}

formRef.addEventListener('input', throttle(onFormInput, 500));

function onPageLoading() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);
  if (!savedFormData) {
    return;
  }
  try {
    const parsData = JSON.parse(savedFormData);
    Object.entries(parsData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  } catch (error) {
    console.log(error);
  }
}
function onFormSubmit(event) {
  event.preventDefault();
  console.log(localStorage.getItem(STORAGE_KEY));
  // const {
  //   elements: { email, message },
  // } = event.currentTarget;
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

formRef.addEventListener('submit', onFormSubmit);
