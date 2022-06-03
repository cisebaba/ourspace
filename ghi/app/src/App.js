import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import ListJobs from './JobsPage';
import EventForm from './Events/EventForm';
import MainPage from './MainPage';

// Still working on JobsPage - not functioning yet

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/" element={<ListJobs />} /> */}
           {/* <Route path="events"> */}
            <Route path = "events/new" element={<EventForm/>} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
