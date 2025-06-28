import React from 'react'
import { motion } from 'framer-motion'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  MessageCircle,
  Mail,
  Globe,
  Smartphone,
  Monitor,
  Shield,
  FileText,
  Cookie,
  Scale
} from 'lucide-react'
import { GlassmorphicCard } from '../UI/GlassmorphicCard'
import { NeonButton } from '../UI/NeonButton'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'PRODUCT',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Security', href: '/security' },
        { label: 'Roadmap', href: '/roadmap' },
      ]
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'API Documentation', href: '/docs' },
        { label: 'Community Forum', href: '/community' },
        { label: 'Developer Tools', href: '/developers' },
      ]
    },
    {
      title: 'COMPANY',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'LEGAL',
      links: [
        { label: 'Privacy Policy', href: '/privacy', icon: <Shield className="w-4 h-4" /> },
        { label: 'Terms of Service', href: '/terms', icon: <FileText className="w-4 h-4" /> },
        { label: 'Cookie Policy', href: '/cookies', icon: <Cookie className="w-4 h-4" /> },
        { label: 'GDPR Compliance', href: '/gdpr', icon: <Scale className="w-4 h-4" /> },
      ]
    }
  ]

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/moneyflow', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com/company/moneyflow', label: 'LinkedIn' },
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/moneyflow', label: 'GitHub' },
    { icon: <MessageCircle className="w-5 h-5" />, href: 'https://discord.gg/moneyflow', label: 'Discord' },
  ]

  const downloadLinks = [
    { icon: <Smartphone className="w-5 h-5" />, label: 'iOS App', href: '/download/ios' },
    { icon: <Smartphone className="w-5 h-5" />, label: 'Android App', href: '/download/android' },
    { icon: <Monitor className="w-5 h-5" />, label: 'Desktop App', href: '/download/desktop' },
  ]

  return (
    <footer className="mt-16 p-4">
      <GlassmorphicCard className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">MoneyFlow</h3>
                <p className="text-sm text-gray-400">AI-Powered Budget Tracker</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Revolutionizing personal finance with cutting-edge AI technology and 
              immersive 3D visualizations. Take control of your financial future today.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <NeonButton variant="primary" size="sm">
                  Subscribe
                </NeonButton>
              </div>
              <p className="text-xs text-gray-500">
                Get the latest updates on new features and financial insights.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Connect:</span>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Download Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Download:</span>
              {downloadLinks.map((download) => (
                <motion.a
                  key={download.label}
                  href={download.href}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-400 hover:text-white transition-all text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {download.icon}
                  <span className="hidden sm:inline">{download.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Language & Currency Selectors */}
            <div className="flex items-center gap-4">
              <select className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="en" className="bg-gray-800">English</option>
                <option value="es" className="bg-gray-800">Español</option>
                <option value="fr" className="bg-gray-800">Français</option>
                <option value="de" className="bg-gray-800">Deutsch</option>
              </select>
              
              <select className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="USD" className="bg-gray-800">USD ($)</option>
                <option value="EUR" className="bg-gray-800">EUR (€)</option>
                <option value="GBP" className="bg-gray-800">GBP (£)</option>
                <option value="JPY" className="bg-gray-800">JPY (¥)</option>
              </select>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                © {currentYear} MoneyFlow Team. All rights reserved.
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Version 1.0.0</span>
                <span>•</span>
                <span>Built with ❤️ using cutting-edge web technologies</span>
              </div>
            </div>
          </div>
        </div>
      </GlassmorphicCard>
    </footer>
  )
}