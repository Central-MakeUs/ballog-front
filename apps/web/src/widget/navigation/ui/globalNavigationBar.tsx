import { NavLink } from 'react-router-dom'
import Home from '@/assets/home.svg'

const navItems = [
  { href: '/', icon: Home, label: '홈' },
  { href: '/log', icon: Home, label: '직관로그' },
  { href: '/mypage', icon: Home, label: '마이페이지' },
]

export const GlobalNavigationBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t flex justify-around items-center z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? 'text-black' : 'text-gray-400'
            }`
          }
        >
          <img src={item.icon} alt={item.label} className="w-6 h-6" />
          <span className="text-xs">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
