import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      await login(values);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="nx-auth">
      <div className="nx-auth__panel">
        <motion.div
          className="nx-auth__card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="nx-auth__brand">
            <span className="nx-auth__mark">N</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-lg)' }}>
              Nexora
            </span>
          </div>

          <h2 className="nx-auth__title">Welcome back</h2>
          <p className="nx-auth__subtitle">Sign in to your business workspace.</p>

          <form className="nx-auth__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              iconLeft={<FiMail size={16} />}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              iconLeft={<FiLock size={16} />}
              iconRight={showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              onIconRightClick={() => setShowPassword((s) => !s)}
              error={errors.password?.message}
              {...register('password', { required: 'Password is required' })}
            />

            <div className="nx-auth__row">
              <label className="nx-checkbox">
                <input type="checkbox" {...register('remember')} />
                Remember me
              </label>
              <Link to="/forgot-password" className="nx-auth__link">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" loading={submitting} style={{ width: '100%' }}>
              Sign in
            </Button>
          </form>

          <p className="nx-auth__footer">
            Don't have an account? <Link to="/register" className="nx-auth__link">Create one</Link>
          </p>
        </motion.div>
      </div>

      <div className="nx-auth__showcase">
        <div className="nx-auth__showcase-content">
          <h2>Run your whole business from one workspace.</h2>
          <p>CRM, sales pipeline, projects, invoicing and analytics — Nexora brings every team onto a single, fast platform.</p>
        </div>
      </div>
    </div>
  );
}
