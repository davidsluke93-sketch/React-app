export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegister(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!formData.password) {
    errors.password = 'Password is required.';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

export function validateLogin(formData) {
  const errors = {};

  if (!formData.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!formData.password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

export function validateEvent(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Event name is required.';
  }

  if (!formData.date) {
    errors.date = 'Date is required.';
  }

  if (!formData.time) {
    errors.time = 'Time is required.';
  }

  if (!formData.location.trim()) {
    errors.location = 'Location is required.';
  }

  if (!formData.description.trim()) {
    errors.description = 'Description is required.';
  }

  return errors;
}
