'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Code2, Zap, Shield } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Supremyx</h1>
          <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Build Modern Web Solutions with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Next.js</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Create stunning, performant web applications with TypeScript, Tailwind CSS, and best practices.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-slate-600 hover:bg-slate-800">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Powerful Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: 'TypeScript Support',
                description: 'Full TypeScript support for type-safe development and better IDE experience.',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized performance with Next.js 16 and modern web standards.',
              },
              {
                icon: Shield,
                title: 'Secure by Default',
                description: 'Built-in security best practices and ESLint configuration.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <Card key={i} className="bg-slate-900 border-slate-700 hover:border-purple-500 transition-colors">
                  <CardHeader>
                    <Icon className="h-8 w-8 text-purple-500 mb-4" />
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-400">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Build Something Amazing?</h3>
          <p className="text-purple-100 mb-8">Start your next project with our modern setup.</p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100">
            Start Building Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; 2026 Supremyx. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
