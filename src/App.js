import './App.css';
import React, {  useState } from 'react' // rcc
import Navbar from './Navbar';
import Newscomp from './Newscomp';
import {
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =() => {
 const pageSize = 15;

  const [progress, setProgress] = useState(0); 
    return (
      <div >
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          {/* first route for News */}
         <Route path="/" element={<Newscomp setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route path="/general" element={<Newscomp setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route path="/entertainment" element={<Newscomp setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
          <Route path="/business" element={<Newscomp setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business" />} />
          <Route path="/health" element={<Newscomp setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health" />} />
          <Route path="/sports" element={<Newscomp setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports" />} />
          <Route path="/science" element={< Newscomp setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science" />} />
          <Route path="/technology" element={<Newscomp setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology" />} />
        </Routes>
     </div>
    )
  }




export default App
