import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-bold text-lg mb-4">Groupon</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-groupon-gray hover:text-groupon-blue text-sm transition-colors">About Groupon</Link></li>
              <li><Link to="/jobs" className="text-groupon-gray hover:text-groupon-blue text-sm transition-colors">Jobs</Link></li>
              <li><Link to="/press" className="text-groupon-gray hover:text-groupon-blue text-sm transition-colors">Press</Link></li>
              <li><Link to="/blog" className="text-groupon-gray hover:text-groupon-blue text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Work with Groupon</h3>
            <ul className="space-y-3">
              <li><Link to="/merchants" className="text-groupon-gray hover:text-groupon-blue text-sm transition-colors">Run a Groupon Deal</Link></li>
              <li><Link to="/affiliate" className="text-groupon-gray hover:text-groupon-blue text-sm transition-colors">Affiliate Program</Link></li>
              <li><Link to="/supplier" className="text-groupon-gray hover:text-groupon-blue text-sm transition-colors">Supplier Code of Conduct</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Support</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-groupon-gray hover:text-groupon-blue text-sm transition-colors">Help Center</Link></li>
              <li><Link to="/returns" className="text-groupon-gray hover:text-groupon-blue text-sm transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/groupon-plus" className="text-groupon-gray hover:text-groupon-blue text-sm transition-colors">Groupon+</Link></li>
              <li><Link to="/gift-cards" className="text-groupon-gray hover:text-groupon-blue text-sm transition-colors">Gift Cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com" className="text-groupon-gray hover:text-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-groupon-gray hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-groupon-gray hover:text-pink-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-groupon-gray hover:text-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <h3 className="font-bold text-lg mb-4">Get the Groupon App</h3>
            <div className="flex space-x-2">
              <a href="#" className="border border-gray-300 rounded px-3 py-2 text-xs hover:bg-gray-50 transition-colors">
                App Store
              </a>
              <a href="#" className="border border-gray-300 rounded px-3 py-2 text-xs hover:bg-gray-50 transition-colors">
                Google Play
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-groupon-gray mb-4 md:mb-0">© 2025 Groupon Clone. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-xs text-groupon-gray hover:text-groupon-blue transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-xs text-groupon-gray hover:text-groupon-blue transition-colors">Terms of Use</Link>
              <Link to="/licenses" className="text-xs text-groupon-gray hover:text-groupon-blue transition-colors">Licenses</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;