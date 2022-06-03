import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
// import ListJobs from './JobsPage';
import EventForm from './Events/CreateEventForm.js';
import MainPage from './MainPage';

// Still working on JobsPage - not functioning yet

function App() {
  return (
    <>
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/" element={<ListJobs />} /> */}
            <Route path = "events/new" element={<EventForm/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
