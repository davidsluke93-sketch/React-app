import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import { useApp } from '../context/AppContext';
import { validateLogin } from '../utils/validation';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);
    setSubmitError('');

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const result = loginUser(formData);

    if (!result.success) {
      setSubmitError(result.message);
      return;
    }

    navigate(location.state?.from || '/dashboard');
  };

  return (
    <AuthCard title="Welcome back" subtitle="Log in to view your dashboard and events.">
      <div className="alert alert-info small">
        Demo account: <strong>demo@example.com</strong> / <strong>Password123</strong>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {submitError && <div className="alert alert-danger">{submitError}</div>}

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

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      <p className="mt-4 mb-0 text-secondary text-center">
        Need an account? <Link to="/register">Register here</Link>
      </p>
    </AuthCard>
  );
}

export default LoginPage;
