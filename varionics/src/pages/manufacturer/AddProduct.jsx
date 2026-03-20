import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Input from '../../components/Input'
import Button from '../../components/Button'

const CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Sports', 'Beauty', 'Books', 'Other']

export default function AddProduct() {
  const navigate = useNavigate()
  const { addProduct } = useApp()
  const [form, setForm] = useState({
    title: '',
    price: '',
    bulkPrice: '',
    moq: '',
    category: 'Electronics',
    description: '',
    image: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Valid price required'
    if (!form.moq || isNaN(form.moq) || Number(form.moq) <= 0) e.moq = 'Valid MOQ required'
    if (!form.description.trim()) e.description = 'Description is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    setTimeout(() => {
      addProduct({
        ...form,
        price: Number(form.price),
        bulkPrice: Number(form.bulkPrice) || Math.round(Number(form.price) * 0.7),
        moq: Number(form.moq),
        image: form.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      })
      navigate('/products')
    }, 800)
  }

  return (
    <div className="px-4 py-5 pb-8">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[#6C63FF] text-sm font-semibold mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-extrabold text-gray-900">Add Product</h1>
        <p className="text-sm text-gray-500 mt-1">List your product for retailers to discover</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Upload Area */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Product Image</p>
          <div className={`relative w-full h-48 border-2 border-dashed rounded-3xl overflow-hidden transition-all ${form.image ? 'border-[#6C63FF]' : 'border-gray-300 hover:border-[#6C63FF]'}`}>
            {form.image ? (
              <div className="relative w-full h-full">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={() => set('image', '')} />
                <button type="button" onClick={() => set('image', '')} className="absolute top-2 right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white shadow-md">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
                <div className="w-12 h-12 bg-[#EEF0FF] rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#6C63FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-600">Upload Product Image</p>
                <p className="text-xs text-gray-400">Or paste image URL below</p>
              </label>
            )}
          </div>
          <input
            type="url"
            value={form.image}
            onChange={e => set('image', e.target.value)}
            placeholder="https://... (image URL)"
            className="mt-2 w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
          />
        </div>

        <Input
          label="Product Title"
          required
          value={form.title}
          onChange={e => set('title', e.target.value)}
          placeholder="e.g., Premium Wireless Headphones"
        />
        {errors.title && <p className="text-xs text-red-500 -mt-4">{errors.title}</p>}

        {/* Category */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">Category <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => set('category', cat)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                  form.category === cat
                    ? 'bg-[#6C63FF] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              label="Retail Price (₹)"
              type="number"
              required
              value={form.price}
              onChange={e => set('price', e.target.value)}
              placeholder="1999"
            />
            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
          </div>
          <Input
            label="Bulk Price (₹)"
            type="number"
            value={form.bulkPrice}
            onChange={e => set('bulkPrice', e.target.value)}
            placeholder="1399"
          />
        </div>

        <div>
          <Input
            label="Minimum Order Quantity (MOQ)"
            type="number"
            required
            value={form.moq}
            onChange={e => set('moq', e.target.value)}
            placeholder="50"
          />
          {errors.moq && <p className="text-xs text-red-500 mt-1">{errors.moq}</p>}
        </div>

        <div>
          <Input
            label="Description"
            required
            multiline
            rows={4}
            value={form.description}
            onChange={e => set('description', e.target.value)}
            placeholder="Describe your product in detail..."
          />
          {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
        </div>

        <Button
          type="submit"
          fullWidth
          variant="primary"
          disabled={submitting}
          className="!py-4 !text-base !rounded-2xl mt-4"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Publishing...
            </span>
          ) : (
            'Publish Product →'
          )}
        </Button>
      </form>
    </div>
  )
}
