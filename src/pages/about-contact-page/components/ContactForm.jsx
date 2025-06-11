import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-primary mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-text-secondary mb-6">
          Thank you for reaching out. We'll get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-button font-heading font-medium nav-transition hover:bg-accent/90"
        >
          <Icon name="Plus" size={18} />
          <span>Send Another Message</span>
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email Row */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block font-heading font-medium text-primary mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/20 nav-transition ${
              errors.name 
                ? 'border-error focus:border-error' :'border-border focus:border-accent'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-heading font-medium text-primary mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/20 nav-transition ${
              errors.email 
                ? 'border-error focus:border-error' :'border-border focus:border-accent'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block font-heading font-medium text-primary mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/20 nav-transition ${
            errors.subject 
              ? 'border-error focus:border-error' :'border-border focus:border-accent'
          }`}
          placeholder="What's this about?"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.subject}</span>
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-heading font-medium text-primary mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={6}
          className={`w-full px-4 py-3 border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/20 nav-transition resize-vertical ${
            errors.message 
              ? 'border-error focus:border-error' :'border-border focus:border-accent'
          }`}
          placeholder="Tell us more about your inquiry..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.message}</span>
          </p>
        )}
        <p className="mt-1 text-sm text-text-secondary">
          {formData.message.length}/500 characters
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-background rounded-card p-4 border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-heading font-medium text-primary text-sm mb-1">Privacy Notice</h4>
            <p className="text-text-secondary text-sm">
              Your information is secure with us. We'll only use your contact details to respond to your inquiry 
              and will never share them with third parties.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-white px-6 py-3 rounded-button font-heading font-medium nav-transition hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Icon name="Send" size={18} />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;