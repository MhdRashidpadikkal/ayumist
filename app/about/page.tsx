import Navigation from '../components/Navigation'
import { Leaf, Award, Users, Heart } from 'lucide-react'

export default function About() {
  return (
    <div>
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brown-600 to-brown-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Our Story</h1>
          <p className="text-xl text-cream-200">Bringing ancient Ayurvedic wisdom to modern wellness</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brown-800 mb-6">
                Rooted in Tradition, Crafted for Today
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                AYUMIST was born from a deep reverence for Ayurveda's timeless wisdom and a commitment to making authentic wellness accessible to everyone. Our journey began with a simple belief: that nature holds the key to true health and beauty.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Every product in our collection is carefully crafted using traditional Ayurvedic principles, combined with modern quality standards to ensure purity, potency, and effectiveness.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brown-700">5000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brown-700">20+</div>
                  <div className="text-sm text-gray-600">Premium Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brown-700">100%</div>
                  <div className="text-sm text-gray-600">Natural</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Ayurvedic herbs and ingredients"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-brown-800 mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-brown-100 to-brown-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-8 w-8 text-brown-600" />
              </div>
              <h3 className="text-xl font-semibold text-brown-800 mb-2">Natural Purity</h3>
              <p className="text-gray-600">Only the finest natural ingredients, sourced ethically and sustainably</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-brown-100 to-brown-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-brown-600" />
              </div>
              <h3 className="text-xl font-semibold text-brown-800 mb-2">Quality Excellence</h3>
              <p className="text-gray-600">Rigorous testing and quality control ensure every product meets our high standards</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-brown-100 to-brown-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-brown-600" />
              </div>
              <h3 className="text-xl font-semibold text-brown-800 mb-2">Community Care</h3>
              <p className="text-gray-600">Supporting local communities and traditional knowledge keepers</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-brown-100 to-brown-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-brown-600" />
              </div>
              <h3 className="text-xl font-semibold text-brown-800 mb-2">Holistic Wellness</h3>
              <p className="text-gray-600">Promoting complete well-being of mind, body, and spirit</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}