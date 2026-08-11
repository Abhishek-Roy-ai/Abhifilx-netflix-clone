export default function Footer() {
  return (
    <footer className="bg-[#141414] text-gray-500 text-xs py-12 px-6 md:px-16 border-t border-gray-900">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:underline">Audio Description</a>
          <a href="#" className="hover:underline">Help Center</a>
          <a href="#" className="hover:underline">Gift Cards</a>
          <a href="#" className="hover:underline">Media Center</a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#" className="hover:underline">Investor Relations</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Legal Notices</a>
          <a href="#" className="hover:underline">Cookie Preferences</a>
          <a href="#" className="hover:underline">Corporate Information</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>

        <div className="pt-4 border-t border-gray-900 text-gray-600 text-[11px]">
          © {new Date().getFullYear()} Abhiflix, Inc. Production-Ready Full Stack Architecture.
        </div>
      </div>
    </footer>
  )
}
