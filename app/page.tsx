import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import { Leaf, Shield, Truck, HeartHandshake, Star, Award, Users, Globe } from 'lucide-react'
import { products } from './data/products'
import PromotionVideo from './components/PromotionVideo'

export default function Home() {
  const featuredProducts = products.filter(product => product.featured)

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "AYUMIST products have transformed my skincare routine. The natural ingredients work wonders!",
      image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=B8956B&color=fff"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment: "The hair oil is amazing! My hair feels stronger and healthier after just a month of use.",
      image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=B8956B&color=fff"
    },
    {
      name: "Anita Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Love the natural approach to wellness. These products are gentle yet effective.",
      image: "https://ui-avatars.com/api/?name=Anita+Patel&background=B8956B&color=fff"
    }
  ]

  const stats = [
    { icon: Users, value: "50,000+", label: "Happy Customers" },
    { icon: Award, value: "20+", label: "Premium Products" },
    { icon: Globe, value: "100+", label: "Cities Served" },
    { icon: Star, value: "4.8", label: "Average Rating" }
  ]

  return (
    <div>
      <Navigation />
      <Hero />
      
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-brown-600 to-brown-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="bg-white/10   p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold font-serif mb-2">{stat.value}</div>
                <div className="text-cream-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Why Choose AYUMIST?</h2>
            <p className="text-gray-600 text-lg">Experience the difference of authentic Ayurvedic wellness</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-brown-100 to-brown-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-8 w-8 text-brown-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">100% Natural</h3>
              <p className="text-gray-600">Pure ingredients sourced from nature</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-brown-100 to-brown-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-brown-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Clinically Tested</h3>
              <p className="text-gray-600">Scientifically proven formulations</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-brown-100 to-brown-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-8 w-8 text-brown-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Delivered right to your doorstep</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-brown-100 to-brown-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <HeartHandshake className="h-8 w-8 text-brown-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Care</h3>
              <p className="text-gray-600">24/7 support for your wellness journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Handpicked wellness essentials for your daily routine</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-flex items-center bg-gradient-to-r from-brown-600 to-brown-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View All Products
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
        {/* video section */}
        <section>
          <PromotionVideo/>
        </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Real experiences from our wellness community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-cream-50 p-6 rounded-2xl shadow-lg animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-brown-600 to-brown-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Stay Connected with AYUMIST
          </h2>
          <p className="text-cream-100 text-lg mb-8">
            Get exclusive offers, wellness tips, and new product updates
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-300 shadow-lg"
            />
            <button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}