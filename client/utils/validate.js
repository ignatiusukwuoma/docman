import validator from 'validator';

/**
 * Confirm that all required fields are filled
 * @param {array} [inputFields=[]]
 * @param {array} [requiredFields=[]]
 * @returns {object} errors and valid
 */
export function validateFields(inputFields = [], requiredFields = []) {
  const errors = {};
  let valid = true;
  inputFields.forEach((field, i) => {
    if (validator.isEmpty(String(field))) {
      errors[requiredFields[i]] = `Please enter your ${requiredFields[i]}`;
      valid = false;
    }
  });

  return { errors, valid };
}

/**
 * Validates the signup form
 * @param {object} {
 *   name = '', email = '', username = '', password = '' }
 * @param {string} confirmPassword
 * @returns {object} validate
 */
export function signup({
  name = '', email = '', username = '', password = '' }, confirmPassword) {
  const validate = validateFields(
    [username, password, name, email],
    ['username', 'password', 'name', 'email']);
  if (/\s/.test(username) || (/\W/).test(username)) {
    validate.errors.username = 'Please enter a valid username';
    validate.valid = false;
  }

  if (!validator.isEmail(email)) {
    validate.errors.email = 'Please enter a valid email';
    validate.valid = false;
  }

  if (!validator.equals(password, confirmPassword)) {
    validate.errors.confirmPassword = 'Passwords must match';
    validate.valid = false;
  }

  return validate;
}

/**
 * Validates the edit profile form
 * @param {object} {
 *   name = '', email = '', username = '' }
 * @returns {object} validate
 */
export function editprofile({
  name = '', email = '', username = '' }) {
  const validate = validateFields(
    [username, name, email],
    ['username', 'name', 'email']);
  if (/\s/.test(username) || (/\W/).test(username)) {
    validate.errors.username = 'Please enter a valid username';
    validate.valid = false;
  }

  if (!validator.isEmail(email)) {
    validate.errors.email = 'Please enter a valid email';
    validate.valid = false;
  }

  return validate;
}

/**
 * Validates the signin form
 * @param {object} { username = '', password = '' }
 * @returns {object} validate
 */
export function signin({ username = '', password = '' }) {
  const validate = validateFields(
    [username, password],
    ['username', 'password']);
  if (/\s/.test(username) || (/\W/).test(username)) {
    validate.errors.username = 'Please enter a valid username';
    validate.valid = false;
  }
  return validate;
}

/**
 * Validates the document form
 * @param {string} { title = '', access = '', content = '' }
 * @returns {object} validate
 */
export function document({ title = '', access = '', content = '' }) {
  const validate = validateFields(
    [title, access, content],
    ['title', 'access', 'content']);
  if (access === 'select') {
    validate.errors.access = 'Please select an access level';
    validate.valid = false;
  }
  return validate;
}
