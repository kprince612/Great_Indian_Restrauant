import logo from './logo.svg';
import './App.css';
import Navbar from './Mycomponent/Navbar.js'
import Home from './Mycomponent/Home.js';
import About from './Mycomponent/About.js';
import Chef from './Mycomponent/chef.js';
import Menu from './Mycomponent/Menu.js';
import News from './Mycomponent/News.js';
import Book from './Mycomponent/Book.js';
import Verify from './Mycomponent/Verify.js';
import Confirm from './Mycomponent/Confirm.js';
import Previous from './Mycomponent/Previous.js';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>

    <Navbar/>
    <Router>
      <Routes>
        <Route exact path='/' element={
          <>
          <Home/>
          </>
        }></Route>

        <Route path='/About' element={<About/>}></Route>
        <Route path='/chef' element={<Chef/>}></Route>
        <Route path='/Verify' element={<Verify/>}></Route>
        <Route path='/Menu' element={<Menu/>}></Route>
        <Route path='/Previous' element={<Previous/>}></Route>
        <Route path='/Confirm' element={<Confirm/>}></Route>
        <Route path='/News' element={<News/>}></Route>
        <Route path='/Book' element={<Book/>}></Route>
      </Routes>
    </Router>


    {/* <Home/> */}
    {/* <About/> */}
    {/* <Chef/> */}
    {/* <Menu/> */}
    {/* <News/> */}
    {/* <Book/> */}
    </>
  );
}

export default App;
