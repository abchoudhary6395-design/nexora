import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { authService } from '../../services/api/authService';

function passwordStrength(pw = '') {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-4
}

const STRENGTH_LABEL = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLOR = ['var(--color-danger)', 'var(--color-danger)', 'var(--color-warning)', 'var(--color-primary)', 'var(--color-success)'];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password', '');
  const strength = passwordStrength(password);

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const { data } = await authService.register(values);
      localStorage.setItem('nexora-token', data.token);
      toast.success('Account created — welcome to Nexora!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not create your account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="nx-auth">
      <div className="nx-auth__panel">
        <motion.div
          className="nx-auth__card"
          style={{ maxWidth: 420 }}
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

          <h2 className="nx-auth__title">Create your workspace</h2>
          <p className="nx-auth__subtitle">Start running your business from one platform.</p>

          <form className="nx-auth__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="nx-field-grid">
              <Input
                label="First name"
                iconLeft={<FiUser size={16} />}
                error={errors.first_name?.message}
                {...register('first_name', { required: 'Required' })}
              />
              <Input
                label="Last name"
                iconLeft={<FiUser size={16} />}
                error={errors.last_name?.message}
                {...register('last_name', { required: 'Required' })}
              />
            </div>

            <Input
              label="Email address"
              type="email"
              iconLeft={<FiMail size={16} />}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
            />

            <div className="nx-field-grid">
              <Input
                label="Phone"
                type="tel"
                iconLeft={<FiPhone size={16} />}
                {...register('phone')}
              />
              <Input
                label="Company name"
                iconLeft={<FiBriefcase size={16} />}
                error={errors.company_name?.message}
                {...register('company_name', { required: 'Required' })}
              />
            </div>

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              iconLeft={<FiLock size={16} />}
              iconRight={showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              onIconRightClick={() => setShowPassword((s) => !s)}
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'At least 8 characters' },
              })}
            />
            {password && (
              <div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      style={{
                        height: 4, flex: 1, borderRadius: 'var(--radius-full)',
                        background: i < strength ? STRENGTH_COLOR[strength] : 'var(--color-border)',
                        transition: 'background var(--transition-base)',
                      }}
                    />
                  ))}
                </div>
                <span className="nx-text-muted" style={{ fontSize: 'var(--fs-2xs)' }}>
                  {STRENGTH_LABEL[strength]}
                </span>
              </div>
            )}

            <Input
              label="Confirm password"
              type={showPassword ? 'text' : 'password'}
              iconLeft={<FiLock size={16} />}
              error={errors.password_confirmation?.message}
              {...register('password_confirmation', {
                required: 'Please confirm your password',
                validate: (v) => v === password || 'Passwords do not match',
              })}
            />

            <label className="nx-checkbox" style={{ alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                {...register('terms', { required: true })}
                style={{ marginTop: 2 }}
              />
              <span style={{ fontSize: 'var(--fs-sm)' }}>
                I agree to the <a href="#" className="nx-auth__link">Terms of Service</a> and{' '}
                <a href="#" className="nx-auth__link">Privacy Policy</a>
              </span>
            </label>
            {errors.terms && <span className="nx-field__error">You must accept the terms to continue</span>}

            <Button type="submit" size="lg" loading={submitting} style={{ width: '100%' }}>
              Create account
            </Button>
          </form>

          <p className="nx-auth__footer">
            Already have an account? <Link to="/login" className="nx-auth__link">Sign in</Link>
          </p>
        </motion.div>
      </div>

      <div className="nx-auth__showcase">
        <div className="nx-auth__showcase-content">
          <h2>Set up your business in minutes.</h2>
          <p>Bring your team, customers, and pipeline into one workspace built to scale with you.</p>
        </div>
      </div>
    </div>
  );
}
