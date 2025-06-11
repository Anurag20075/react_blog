import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

import Breadcrumb from 'components/ui/Breadcrumb';
import TeamMemberCard from './components/TeamMemberCard';
import ContactForm from './components/ContactForm';
import BlogStats from './components/BlogStats';
import SocialLinks from './components/SocialLinks';

const AboutContactPage = () => {
  const [activeSection, setActiveSection] = useState('about');

  const aboutContent = {
    mission: `BlogHub is dedicated to creating a vibrant community where knowledge meets creativity. Our mission is to provide a platform where writers, thinkers, and innovators can share their insights, experiences, and expertise with a global audience.

Founded in 2020, we believe that every story matters and every voice deserves to be heard. We're committed to fostering meaningful conversations, promoting diverse perspectives, and building bridges between ideas and communities.`,
    
    story: `What started as a simple idea between friends has grown into a thriving digital community. Our founders, passionate about the power of storytelling and knowledge sharing, recognized the need for a platform that prioritizes quality content and genuine engagement over viral trends.

Today, BlogHub serves thousands of readers and hundreds of contributors worldwide, maintaining our core values of authenticity, inclusivity, and intellectual curiosity.`,
    
    values: [
      {
        title: "Quality Content",
        description: "We prioritize well-researched, thoughtful articles that provide real value to our readers.",
        icon: "BookOpen"
      },
      {
        title: "Community First",
        description: "Our community of writers and readers is at the heart of everything we do.",
        icon: "Users"
      },
      {
        title: "Diverse Voices",
        description: "We celebrate different perspectives and encourage writers from all backgrounds.",
        icon: "Globe"
      },
      {
        title: "Continuous Learning",
        description: "We believe in the power of knowledge sharing and lifelong learning.",
        icon: "GraduationCap"
      }
    ]
  };

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Founder & Editor-in-Chief",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: `Sarah is a veteran journalist with over 12 years of experience in digital media. She founded BlogHub with the vision of creating a platform that celebrates quality storytelling and meaningful discourse.`,
      expertise: ["Content Strategy", "Editorial Leadership", "Digital Publishing"],
      social: {
        twitter: "@sarahchen",
        linkedin: "sarah-chen-editor"
      }
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: `Marcus brings 10+ years of full-stack development experience to BlogHub. He's passionate about creating seamless user experiences and scalable platforms that serve our growing community.`,
      expertise: ["Full-Stack Development", "Platform Architecture", "User Experience"],
      social: {
        twitter: "@marcusdev",
        github: "marcus-rodriguez"
      }
    },
    {
      id: 3,
      name: "Dr. Amelia Thompson",
      role: "Content Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: `Dr. Thompson holds a PhD in Communications and has authored several books on digital storytelling. She oversees our content quality and helps writers develop their unique voices.`,
      expertise: ["Content Development", "Writer Mentorship", "Digital Communications"],
      social: {
        twitter: "@ameliathompson",
        linkedin: "dr-amelia-thompson"
      }
    },
    {
      id: 4,
      name: "James Park",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: `James is the heart of our community engagement efforts. With a background in social media and community building, he ensures every member feels valued and heard.`,
      expertise: ["Community Building", "Social Media Strategy", "User Engagement"],
      social: {
        twitter: "@jamespark",
        linkedin: "james-park-community"
      }
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/home-blog-landing-page', isActive: false },
    { label: 'About', path: '/about-contact-page', isActive: true }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Spacing */}
      <div className="h-16 lg:h-16"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb customItems={breadcrumbItems} />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-primary mb-4">
              About BlogHub
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Connecting minds, sharing stories, and building a community of passionate writers and curious readers.
            </p>
          </motion.div>

          {/* Section Navigation */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-surface rounded-button p-1 border border-border">
              <button
                onClick={() => setActiveSection('about')}
                className={`px-6 py-2 rounded-button font-heading font-medium nav-transition ${
                  activeSection === 'about' ?'bg-accent text-white' :'text-text-primary hover:text-accent hover:bg-accent/5'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => setActiveSection('contact')}
                className={`px-6 py-2 rounded-button font-heading font-medium nav-transition ${
                  activeSection === 'contact' ?'bg-accent text-white' :'text-text-primary hover:text-accent hover:bg-accent/5'
                }`}
              >
                Contact
              </button>
            </div>
          </motion.div>

          {/* About Section */}
          {activeSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-3 gap-12"
            >
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Mission */}
                <motion.div variants={itemVariants} className="bg-surface rounded-card p-8 content-shadow">
                  <h2 className="font-heading text-2xl font-bold text-primary mb-6">Our Mission</h2>
                  <div className="prose prose-lg max-w-none text-text-primary">
                    <p className="mb-4">{aboutContent.mission}</p>
                  </div>
                </motion.div>

                {/* Our Story */}
                <motion.div variants={itemVariants} className="bg-surface rounded-card p-8 content-shadow">
                  <h2 className="font-heading text-2xl font-bold text-primary mb-6">Our Story</h2>
                  <div className="prose prose-lg max-w-none text-text-primary">
                    <p className="mb-4">{aboutContent.story}</p>
                  </div>
                </motion.div>

                {/* Values */}
                <motion.div variants={itemVariants} className="bg-surface rounded-card p-8 content-shadow">
                  <h2 className="font-heading text-2xl font-bold text-primary mb-8">Our Values</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {aboutContent.values.map((value, index) => (
                      <motion.div
                        key={value.title}
                        variants={itemVariants}
                        className="flex items-start space-x-4"
                      >
                        <div className="w-12 h-12 bg-accent/10 rounded-card flex items-center justify-center flex-shrink-0">
                          <Icon name={value.icon} size={24} className="text-accent" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-primary mb-2">{value.title}</h3>
                          <p className="text-text-secondary text-sm">{value.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Team Section */}
                <motion.div variants={itemVariants} className="bg-surface rounded-card p-8 content-shadow">
                  <h2 className="font-heading text-2xl font-bold text-primary mb-8">Meet Our Team</h2>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {teamMembers.map((member) => (
                      <TeamMemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <BlogStats />
                <SocialLinks />
              </div>
            </motion.div>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-3 gap-12"
            >
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <motion.div variants={itemVariants} className="bg-surface rounded-card p-8 content-shadow">
                  <h2 className="font-heading text-2xl font-bold text-primary mb-6">Get In Touch</h2>
                  <p className="text-text-secondary mb-8">
                    Have a question, suggestion, or just want to say hello? We'd love to hear from you. 
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  <ContactForm />
                </motion.div>
              </div>

              {/* Contact Info Sidebar */}
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="bg-surface rounded-card p-6 content-shadow">
                  <h3 className="font-heading text-lg font-semibold text-primary mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Mail" size={20} className="text-accent" />
                      <span className="text-text-primary">hello@bloghub.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Phone" size={20} className="text-accent" />
                      <span className="text-text-primary">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={20} className="text-accent" />
                      <span className="text-text-primary">San Francisco, CA</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-surface rounded-card p-6 content-shadow">
                  <h3 className="font-heading text-lg font-semibold text-primary mb-6">Response Time</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">General Inquiries</span>
                      <span className="text-text-primary font-medium">24-48 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Press & Media</span>
                      <span className="text-text-primary font-medium">Same day</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Technical Support</span>
                      <span className="text-text-primary font-medium">2-4 hours</span>
                    </div>
                  </div>
                </motion.div>

                <SocialLinks />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutContactPage;