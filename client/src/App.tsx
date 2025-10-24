import { NavBar } from './components/NavBar'
import './App.css'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import { UserList } from './pages/UserList';



function App() {
  

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/users' element={<UserList />} />
        {/* <Route path='/create' element={<UserForm />} /> */}
        
      </Routes>
    </Router>

    
  )
}

export default App
