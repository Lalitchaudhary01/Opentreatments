"use client";

import { useState } from "react";
import {
  Search,
  Shield,
  FileText,
  Calculator,
  Heart,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("treatment");
  const [location, setLocation] = useState("");

  // Sample data
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Compare hospital costs",
      description: "See real prices from hospitals near you",
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "AI estimator",
      description: "Get accurate cost predictions for procedures",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified bills",
      description: "Authentic bills submitted by real patients",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Insurance calculator",
      description: "See what your insurance will actually cover",
    },
  ];

  const steps = [
    {
      title: "Search & compare",
      description:
        "Find hospitals and treatments in your area with transparent pricing",
    },
    {
      title: "Check coverage",
      description:
        "See what your insurance covers and estimate out-of-pocket costs",
    },
    {
      title: "Book or consult",
      description: "Schedule an appointment or get a virtual consultation",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      location: "Delhi",
      text: "Saved 40% on my mother's knee replacement surgery by comparing prices.",
    },
    {
      name: "Priya Patel",
      location: "Mumbai",
      text: "The insurance calculator helped me understand my coverage better than my insurance agent did!",
    },
    {
      name: "Arjun Kumar",
      location: "Bangalore",
      text: "Verified bills gave me confidence in the pricing before my appendix surgery.",
    },
  ];

  const blogPosts = [
    {
      title: "Appendix surgery cost in Delhi—2025 guide",
      excerpt: "Complete breakdown of appendectomy costs across top hospitals",
    },
    {
      title: "How to save on cardiac procedures",
      excerpt: "Smart strategies to reduce your heart surgery expenses",
    },
    {
      title: "Understanding insurance co-pays",
      excerpt: "What you really pay despite having health insurance",
    },
  ];

  const partners = [
    { name: "Hospital 1", logo: "/placeholder-logo1.png" },
    { name: "Hospital 2", logo: "/placeholder-logo2.png" },
    { name: "Hospital 3", logo: "/placeholder-logo3.png" },
    { name: "Hospital 4", logo: "/placeholder-logo4.png" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Know the cost before you step in.
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Compare hospital, medicine, and consultation prices in minutes.
            </p>

            <div className="bg-white rounded-lg shadow-sm p-2 flex flex-col sm:flex-row gap-2 mb-6">
              <label htmlFor="search-type" className="sr-only">
                Search type
              </label>
              <select
                id="search-type"
                className="px-4 py-3 border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="treatment">Treatment</option>
                <option value="hospital">Hospital</option>
                <option value="medicine">Medicine</option>
              </select>

              <input
                type="text"
                placeholder="Enter location"
                className="flex-1 px-4 py-3 border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-colors">
                <Search className="w-5 h-5" />
                Compare Costs
              </button>
            </div>

            <button className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2">
              Consult a Doctor
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden md:block">
            {/* Placeholder for healthcare illustration */}
            <div className="bg-blue-100 rounded-xl h-80 flex items-center justify-center">
              <div className="text-center text-blue-600">
                <Heart className="w-16 h-16 mx-auto mb-4" />
                <p>Healthcare Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-lg p-6 border border-slate-200"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Trust & safety
          </h2>

          {/* Transparency Badge */}
          <div className="bg-blue-50 rounded-xl p-8 mb-12 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">
              Transparency Verified
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              All prices are verified through actual patient bills and hospital
              records. We never share your personal information without consent.
            </p>
          </div>

          {/* Partner Logos */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-slate-900 text-center mb-8">
              Our trusted partners
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-slate-100 h-24 rounded-lg flex items-center justify-center"
                >
                  <span className="text-slate-500">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 text-center mb-8">
              What our users say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-slate-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-slate-700">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-16 px-4 md:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Latest insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200"
              >
                <div className="h-40 bg-blue-100"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{post.excerpt}</p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Healthcare Cost</h3>
            <p className="text-slate-300">
              Transparent medical pricing for informed healthcare decisions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cost Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Insurance Tips
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Subscribe</h4>
            <p className="text-slate-300 mb-4">
              Get the latest healthcare cost updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md text-slate-900 flex-1 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-slate-700 text-center text-slate-400">
          <p>© 2025 Healthcare Cost Comparison. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
