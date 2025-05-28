import { useState } from 'react'
import Testimonials from './Components/Testimonials'
// import Login from './Components/LogIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login /> */}
      <Testimonials />
    </>
  )
}

export default App
