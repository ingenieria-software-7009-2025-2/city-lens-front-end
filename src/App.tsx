import { useState } from 'react'
import reactLogo from './assets//images/react.svg'
import viteLogo from './assets/images/vite.svg'
import './assets/styles/app.scss'
import { Login } from './pages/Login/Login';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login></Login>
    </>
  )
}

export default App
