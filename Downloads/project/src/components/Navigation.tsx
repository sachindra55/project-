import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export function Navigation() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Virtual Tour', href: '/virtual-tour' },
    { name: 'Skills Training', href: '/skills-training' },
    { name: 'Community', href: '/community' },
    { name: 'Support', href: '/support' },
    { name: 'About', href: '/about' }
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">SONIVALE</span>
            </Link>
          </div>

          <div className="flex space-x-8">
            {navigation.map((item) => (
              <Link 
                to={item.href} 
                key={item.href}
                className={`inline-flex items-center px-1 pt-1 ${isActive(item.href)}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}