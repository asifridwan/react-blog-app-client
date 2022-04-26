import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from '../pages/Home';
import Blog from '../pages/Blog';
import NotFound from '../pages/NotFound';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/post/:id' element={<Blog/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;