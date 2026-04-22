import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import { useApp } from '../context/AppContext';
import { validateRegister } from '../utils/validation';

function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateRegister(formData);
    setErrors(validationErrors);
    setSubmitError('');

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const result = registerUser(formData);

    if (!result.success) {
      setSubmitError(result.message);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <AuthCard title="Create account" subtitle="Register to manage and track your events.">
      <form onSubmit={handleSubmit} noValidate>
        {submitError && <div className="alert alert-danger">{submitError}</div>}

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.confirmPassword}</div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>

      <p className="mt-4 mb-0 text-secondary text-center">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </AuthCard>
  );
}

export default RegisterPage;
