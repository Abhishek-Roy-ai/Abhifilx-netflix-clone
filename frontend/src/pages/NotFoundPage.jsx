import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="space-y-6 max-w-lg z-10">
        <h1 className="text-7xl md:text-9xl font-black text-[#E50914] tracking-widest">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold">Lost your way?</h2>
        <p className="text-sm md:text-base text-gray-400">
          Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p>
        <div>
          <Link
            to="/"
            className="inline-block bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition shadow-lg"
          >
            Abhiflix Home
          </Link>
        </div>
      </div>
    </div>
  )
}
