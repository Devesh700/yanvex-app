import { isTs } from "../args.js"
export const HomePage =  `
export default function HomePage({ brandName }${isTs ? ': { brandName: string }' : ''}) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl place-items-center px-6 py-20">
      <div className="max-w-3xl text-center">
        <p className="mb-4 inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
          Vite + React + Tailwind CSS v4 Starter
        </p>
        <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-7xl">
          Welcome to <span className="text-indigo-600">{brandName}</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          A clean starter with public routes, protected routes, and demo authentication ready for your next project.
        </p>
      </div>
    </section>
  );
}
`