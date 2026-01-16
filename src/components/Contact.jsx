import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Using FormSubmit.co - free form backend
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('https://formsubmit.co/eddcollado@gmail.com', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };
  
  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'eddcollado@gmail.com',
      link: 'mailto:eddcollado@gmail.com',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Eddy Collado',
      link: 'https://www.linkedin.com/in/eddy-collado-057532a8/',
    },
    {
      icon: '💻',
      label: 'GitHub',
      value: '@EddyCollado',
      link: 'https://github.com/EddyCollado',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Denver, Colorado',
      link: null,
    },
  ];
  
  return (
    <section id="contact" className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision. Feel free to reach out through any of these channels.
              </p>
            </div>
            
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const CardContent = (
                  <>
                    <div className="text-3xl">{info.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">{info.label}</div>
                      <div className="text-white">{info.value}</div>
                    </div>
                  </>
                );

                return info.link ? (
                  <motion.a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10 rounded-lg hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    {CardContent}
                  </motion.a>
                ) : (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10 rounded-lg"
                  >
                    {CardContent}
                  </motion.div>
                );
              })}
            </div>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-8"
            >
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {[
                  { icon: '💼', link: 'https://www.linkedin.com/in/eddy-collado-057532a8/', label: 'LinkedIn' },
                  { icon: '💻', link: 'https://github.com/EddyCollado', label: 'GitHub' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 rounded-lg text-2xl hover:border-primary/60 transition-colors"
                    title={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hidden fields for FormSubmit */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 bg-dark border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: focusedField === 'name' ? '#2c98f0' : 'rgba(44, 152, 240, 0.2)',
                  }}
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>
              
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 bg-dark border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: focusedField === 'email' ? '#2c98f0' : 'rgba(44, 152, 240, 0.2)',
                  }}
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>
              
              {/* Subject Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 bg-dark border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: focusedField === 'subject' ? '#2c98f0' : 'rgba(44, 152, 240, 0.2)',
                  }}
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>
              
              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-dark border-2 rounded-lg focus:outline-none transition-colors resize-none"
                  style={{
                    borderColor: focusedField === 'message' ? '#2c98f0' : 'rgba(44, 152, 240, 0.2)',
                  }}
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>
              
              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary to-purple-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: '0 0 30px rgba(44, 152, 240, 0.3)',
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⏳
                    </motion.span>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center"
                >
                  ✅ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              
              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center"
                >
                  ❌ Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
