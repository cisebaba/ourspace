import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import ListJobs from './JobsPage';

// Still working on JobsPage - not functioning yet

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<ListJobs />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
