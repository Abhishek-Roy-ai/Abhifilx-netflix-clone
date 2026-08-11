import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'

export default function MovieRow({ title, items = [], isTop10 = false }) {
  const rowRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  if (!items || items.length === 0) return null

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current
      const scrollAmount = clientWidth * 0.75
      const newScrollLeft = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount

      rowRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' })

      setShowLeftArrow(newScrollLeft > 0)
      setShowRightArrow(newScrollLeft + clientWidth < scrollWidth - 10)
    }
  }

  return (
    <div className="space-y-2 my-6 md:my-8 px-4 md:px-12 select-none group/row">
      <h3 className="text-lg md:text-xl font-bold text-white tracking-wide hover:text-gray-300 cursor-pointer transition">
        {title}
      </h3>

      <div className="relative">
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-0 bottom-0 z-40 bg-black/70 hover:bg-black/90 text-white w-10 md:w-12 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover/row:opacity-100 rounded-r shadow-xl"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Scrollable Container with Vertical Padding for Hover Pop-Out */}
        <div
          ref={rowRef}
          onScroll={() => {
            if (rowRef.current) {
              const { scrollLeft, clientWidth, scrollWidth } = rowRef.current
              setShowLeftArrow(scrollLeft > 5)
              setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10)
            }
          }}
          className="flex items-center space-x-3 md:space-x-4 overflow-x-scroll scrollbar-none py-8 px-2 overflow-y-visible"
        >
          {items.map((item, index) => (
            <MovieCard key={item.id} item={item} isTop10Index={isTop10 ? index : null} />
          ))}
        </div>

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-0 bottom-0 z-40 bg-black/70 hover:bg-black/90 text-white w-10 md:w-12 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover/row:opacity-100 rounded-l shadow-xl"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  )
}
