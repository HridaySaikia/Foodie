import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Cart from './Cart' // Cart modal

const Home = () => {
  const [foodItem, setFoodItem] = useState([])
  const [foodCat, setFoodCat] = useState([])
  const [search, setSearch] = useState('')
  const [cartOpen, setCartOpen] = useState(false)

  // Fetch food data from backend
  const loadData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/foodData`)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const json = await response.json()
      setFoodItem(json[0] || [])
      setFoodCat(json[1] || [])
    } catch (error) {
      console.error("Error loading food data:", error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Carousel images
  const images = [
    { src: 'https://imgs.search.brave.com/HnuzhRWE0G_FULBACunEQRl8lNKEcfQOg2xy1pHLiLY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzEyLzEwLzI2/LzM2MF9GXzkxMjEw/MjYxMF9jN2tKRHMw/MEhJdUdvR2pvdVpk/ZHNyNEQyNGxKWDhM/eC5qcGc', alt: 'Biryani' },
    { src: 'https://imgs.search.brave.com/NEO38FCKaiR2WPUq_kCXEKKSkB9d7dMo8ooVSQn9WiQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2Nzk5MjQ0/NzEwOTEtZjdjZDdh/ZDkwZGRmP2ZtPWpw/ZyZxPTYwJnc9MzAw/MCZpeGxpYj1yYi00/LjEuMCZpeGlkPU0z/d3hNakEzZkRCOE1I/eHpaV0Z5WTJoOE5Y/eDhabTl2WkNVeU1I/QnBlbnBoZkdWdWZE/QjhmREI4Zkh3dw', alt: 'Pizza' },
    { src: 'https://imgs.search.brave.com/xLeIYeOvTTQNaQtDg_v6gomS9o8HG3uIcoOhcy48Yzs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEzLzIwLzkxLzcw/LzM2MF9GXzEzMjA5/MTcwMzJfbkdaRW5O/aGZ3TTJaQlNVS3FF/ZkdNVFI0OVpCZFNZ/OW8uanBn', alt: 'Momo' },
  ]

  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  const nextSlide = () => setCurrent(prev => (prev + 1) % images.length)
  const prevSlide = () => setCurrent(prev => (prev - 1 + images.length) % images.length)

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col relative">
      <Navbar onCartClick={() => setCartOpen(true)} />

      {/* Carousel */}
      <div className="mb-8">
        <div className="relative w-full mx-auto overflow-hidden rounded-xl shadow-lg h-[550px]">
          <div className="relative w-full h-full">
            {images.map((image, idx) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className={`absolute top-0 left-0 w-full h-full object-cover object-center brightness-80 transition-opacity duration-[3000ms] ease-in-out ${idx === current ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
          <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60">❮</button>
          <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60">❯</button>

          {/* Search bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] bg-slate-100 bg-opacity-50 p-3 rounded-xl flex justify-center items-center">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your favorite food..."
              className="w-full px-4 py-2 rounded-lg focus:outline-none text-black"
            />
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((image, idx) => (
              <button
                key={image.src}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${idx === current ? 'bg-yellow-400' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Food Categories */}
      <main className="flex-grow px-6 sm:px-12 lg:px-20 py-6">
        {foodCat.length > 0 && foodCat.map((data) => (
          <section key={data.categoryName} className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 border-b-2 border-yellow-500 inline-block pb-1">
              {data.categoryName}
            </h2>
            {foodItem.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {foodItem
                  .filter(item => item.category === data.categoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map((item, idx) => (
                    <Card
                      key={`${item.name}-${idx}`}
                      foodItem={item}
                      options={item.options || {}} // pass options object
                    />
                  ))}
              </div>
            ) : (
              <p className="text-gray-500 italic mt-4">No such data found.</p>
            )}
          </section>
        ))}
      </main>

      <Footer />

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-4">
            <Cart onClose={() => setCartOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
