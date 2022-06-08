import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import EventForm from "./Events/CreateEventForm.js";
import MainPage from "./MainPage";
import EventsList from "./Events/EventsList";
import JobsList from "./Jobs/JobsList";
import PostsList from "./Forum/ListPosts";
import PostForm from "./Forum/CreatePostForm";

// Still working on JobsPage - not functioning yet

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="events" index element={<EventsList />} />
          <Route path="events/new" element={<EventForm />} />
          <Route path="jobs" element={<JobsList />} />
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/new" element={<PostForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
