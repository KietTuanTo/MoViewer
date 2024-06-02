import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route exact path='/login' element={<UnprotectedRoute><Login /></UnprotectedRoute>}></Route>
          <Route path='/register' element={<UnprotectedRoute><Register /></UnprotectedRoute>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
