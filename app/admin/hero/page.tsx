'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Plus, Edit, Trash2, Eye, Upload, X, Image as ImageIcon, ArrowUp, ArrowDown 
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  active: boolean;
  order: number;
  categoryTag?: string;
}

export default function AdminHero() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const [heroSlides, setHeroSlides] = React.useState<HeroSlide[]>([
    {
      id: 1,
      title: "Pure Ayurvedic Wellness",
      subtitle: "NATURAL HEALING",
      description: "Ancient wisdom meets modern wellness for your daily routine.",
      buttonText: "Shop Now",
      buttonLink: "/products",
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
      active: true,
      order: 1,
      categoryTag: "Best Seller"
    },
    {
      id: 2,
      title: "Handcrafted with Love",
      subtitle: "PREMIUM QUALITY",
      description: "Each product carefully crafted using traditional methods.",
      buttonText: "Explore Products",
      buttonLink: "/products",
      image: "https://images.pexels.com/photos/3685539/pexels-photo-3685539.jpeg",
      active: true,
      order: 2,
      categoryTag: "Recent Products"
    }
  ])

  const [showAddModal, setShowAddModal] = React.useState(false)
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const [selectedSlide, setSelectedSlide] = React.useState<HeroSlide | null>(null)
  const [imagePreview, setImagePreview] = React.useState('')

  const [formData, setFormData] = React.useState({
    title: '',
    subtitle: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    image: '',
    active: true,
    categoryTag: ''
  })

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData(prev => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      image: '',
      active: true,
      categoryTag: ''
    })
    setImagePreview('')
  }

  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault()
    const newSlide: HeroSlide = {
      id: Date.now(),
      ...formData,
      order: heroSlides.length + 1
    }
    setHeroSlides(prev => [...prev, newSlide])
    resetForm()
    setShowAddModal(false)
  }

  const handleEditSlide = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedSlide) {
      setHeroSlides(prev =>
        prev.map(slide =>
          slide.id === selectedSlide.id ? { ...slide, ...formData } : slide
        )
      )
      resetForm()
      setShowEditModal(false)
      setSelectedSlide(null)
    }
  }

  const handleDeleteSlide = () => {
    if (selectedSlide) {
      setHeroSlides(prev => prev.filter(slide => slide.id !== selectedSlide.id))
      setShowDeleteModal(false)
      setSelectedSlide(null)
    }
  }

  const toggleSlideStatus = (id: number) => {
    setHeroSlides(prev =>
      prev.map(slide =>
        slide.id === id ? { ...slide, active: !slide.active } : slide
      )
    )
  }

  const moveSlide = (id: number, direction: 'up' | 'down') => {
    setHeroSlides(prev => {
      const slides = [...prev]
      const index = slides.findIndex(slide => slide.id === id)
      if (direction === 'up' && index > 0) {
        [slides[index], slides[index - 1]] = [slides[index - 1], slides[index]]
      } else if (direction === 'down' && index < slides.length - 1) {
        [slides[index], slides[index + 1]] = [slides[index + 1], slides[index]]
      }
      return slides.map((slide, i) => ({ ...slide, order: i + 1 }))
    })
  }

  const openEditModal = (slide: HeroSlide) => {
    setSelectedSlide(slide)
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      image: slide.image,
      active: slide.active,
      categoryTag: slide.categoryTag || ''
    })
    setImagePreview(slide.image)
    setShowEditModal(true)
  }

  const openDeleteModal = (slide: HeroSlide) => {
    setSelectedSlide(slide)
    setShowDeleteModal(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hero Slides</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-brown-600 text-white px-6 py-2 rounded-md hover:bg-brown-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Hero Slide
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className="bg-white rounded-xl shadow border p-4 relative">
            <img src={slide.image} alt={slide.title} className="h-40 w-full object-cover rounded-md mb-4" />
            <div className="mb-2">
              <h3 className="font-semibold text-lg">{slide.title}</h3>
              <p className="text-sm text-gray-600">{slide.subtitle}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{slide.description}</p>
              {slide.categoryTag && (
                <p className="text-xs text-brown-600 font-semibold mt-1">Tag: {slide.categoryTag}</p>
              )}
            </div>
            <div className="flex justify-between items-center mt-3">
              <button onClick={() => toggleSlideStatus(slide.id)}
                className={`px-3 py-1 text-sm rounded-full ${slide.active ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {slide.active ? 'Deactivate' : 'Activate'}
              </button>
              <div className="flex gap-2">
                <button onClick={() => moveSlide(slide.id, 'up')} disabled={index === 0}><ArrowUp className="w-4 h-4" /></button>
                <button onClick={() => moveSlide(slide.id, 'down')} disabled={index === heroSlides.length - 1}><ArrowDown className="w-4 h-4" /></button>
                <button onClick={() => openEditModal(slide)}><Edit className="w-4 h-4 text-green-600" /></button>
                <button onClick={() => openDeleteModal(slide)}><Trash2 className="w-4 h-4 text-red-600" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {showAddModal ? 'Add Hero Slide' : 'Edit Hero Slide'}
            </h2>
            <form onSubmit={showAddModal ? handleAddSlide : handleEditSlide} className="space-y-4">
              <input name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} className="w-full border rounded p-2" required />
              <input name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleInputChange} className="w-full border rounded p-2" required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="w-full border rounded p-2" required />
              <input name="buttonText" placeholder="Button Text" value={formData.buttonText} onChange={handleInputChange} className="w-full border rounded p-2" required />
              <input name="buttonLink" placeholder="Button Link (e.g. /products)" value={formData.buttonLink} onChange={handleInputChange} className="w-full border rounded p-2" required />
              <input name="categoryTag" placeholder="Category Tag (e.g. Best Seller)" value={formData.categoryTag} onChange={handleInputChange} className="w-full border rounded p-2" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="h-40 object-cover rounded" />}
              <label className="flex items-center space-x-2">
                <input type="checkbox" name="active" checked={formData.active} onChange={handleInputChange} />
                <span>Active</span>
              </label>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => {
                  setShowAddModal(false)
                  setShowEditModal(false)
                  resetForm()
                  setSelectedSlide(null)
                }} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brown-600 text-white rounded">{showAddModal ? 'Add' : 'Update'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedSlide && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">Delete Slide</h2>
            <p className="mb-4">Are you sure you want to delete <strong>{selectedSlide.title}</strong>?</p>
            <div className="flex justify-end space-x-3">
              <button onClick={handleDeleteSlide} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
