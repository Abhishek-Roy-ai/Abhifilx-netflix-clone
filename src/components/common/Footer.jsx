export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 text-sm text-[var(--text-secondary)] md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2">
        <p>Netflix Clone (demo) — built with React, Router, Redux Toolkit, Tailwind.</p>
        <p>
          Data provided by TMDB. Add your key in <span className="text-white">.env</span>.
        </p>
      </div>
    </footer>
  )
}

