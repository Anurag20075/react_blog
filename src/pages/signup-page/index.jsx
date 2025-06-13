import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon'; // Assuming AppIcon can render a generic icon or specific ones

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = (data) => {
    console.log('Signup data:', data);
    // In a real app, you'd call your signup API here
    // For now, let's navigate to login page on successful "signup"
    alert('Signup successful (mock)! Redirecting to login.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          {/* You might want to place a logo here, using AppIcon or AppImage */}
          <Icon name="Users" size={48} className="text-accent" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-heading font-bold text-text-primary">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-text-secondary">
          Or{' '}
          <Link to="/login" className="font-medium text-accent hover:text-accent/80 nav-transition">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-4 shadow-content rounded-card sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-error' : 'border-border'} rounded-button shadow-sm placeholder-text-secondary focus:outline-none focus:ring-accent focus:border-accent sm:text-sm nav-transition`}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-error">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-error' : 'border-border'} rounded-button shadow-sm placeholder-text-secondary focus:outline-none focus:ring-accent focus:border-accent sm:text-sm nav-transition`}
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-error">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-error' : 'border-border'} rounded-button shadow-sm placeholder-text-secondary focus:outline-none focus:ring-accent focus:border-accent sm:text-sm nav-transition`}
                />
              </div>
              {errors.confirmPassword && <p className="mt-2 text-sm text-error">{errors.confirmPassword.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-button shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent nav-transition"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
