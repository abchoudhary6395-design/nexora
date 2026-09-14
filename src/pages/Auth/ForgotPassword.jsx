import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { authService } from '../../services/api/authService';

export default function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  const onSubmit = async ({ email }) => {
    setSubmitting(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send reset link');
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

          {sent ? (
            <div className="nx-flex-col nx-gap-3" style={{ alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--color-success)' }}>
                <FiCheckCircle size={32} />
              </div>
              <h2 className="nx-auth__title">Check your email</h2>
              <p className="nx-auth__subtitle" style={{ marginBottom: 0 }}>
                If an account exists for <strong>{getValues('email')}</strong>, we've sent a link to reset your password.
              </p>
              <Link to="/login" className="nx-auth__link" style={{ marginTop: 'var(--space-3)' }}>
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <h2 className="nx-auth__title">Forgot password?</h2>
              <p className="nx-auth__subtitle">Enter your email and we'll send you a reset link.</p>

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
                <Button type="submit" size="lg" loading={submitting} style={{ width: '100%' }}>
                  Send reset link
                </Button>
              </form>

              <p className="nx-auth__footer">
                Remembered it? <Link to="/login" className="nx-auth__link">Sign in</Link>
              </p>
            </>
          )}
        </motion.div>
      </div>

      <div className="nx-auth__showcase">
        <div className="nx-auth__showcase-content">
          <h2>We've got you covered.</h2>
          <p>Password resets are quick, secure, and only take a minute.</p>
        </div>
      </div>
    </div>
  );
}
