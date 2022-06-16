import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import EventForm from "./Events/CreateEventForm.js";
import MainPage from "./MainPage";
import EventsList from "./Events/EventsList";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Logout from "./Auth/Logout";
import { useToken } from "./authApi";
import JobsList from "./Jobs/JobsList";
import PostsList from "./Forum/PostsList/PostsList";
import PostForm from "./Forum/Forms/PostForm";
import ForumApp from "./Forum/ForumApp";
import PostDetail from "./Forum/PostDetail";
import CommentForm from "./Forum/Forms/CommentForm";
import ReviewsForm from "./Reviews/ReviewsForm";
import ReviewsList from "./Reviews/ReviewsList";
import MentorForm from "./Mentorship/MentorForm";
import MentorList from "./Mentorship/MentorList";

function App() {
  const [token, login, logout, signup] = useToken();
  return (
    <>
      <BrowserRouter>
        <Nav token={token} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* LOGIN */}
          <Route path="logout" element={<Logout logout={logout} />} />
          <Route path="login" element={<Login token={token} login={login} />} />
          <Route
            path="signup"
            element={<Signup token={token} signup={signup} />}
          />
          {/* EVENTS  */}
          <Route path="events" index element={<EventsList />} />
          <Route path="events/new" element={<EventForm token={token} />} />
          {/* JOBS */}
          <Route path="jobs" element={<JobsList />} />
          {/* MENTORSHIP */}
          <Route path="mentorship" element={<MentorList token={token} />} />
          {/* FORUM */}
          <Route path="forum" element={<ForumApp token={token} />} />
          <Route path="posts/:post_id" element={<PostDetail token={token} />} />
          <Route
            path="posts/:post_id/comment/form"
            element={<CommentForm token={token} />}
          />
          <Route path="posts" element={<PostsList token={token} />} />
          <Route path="posts/new" element={<PostForm token={token} />} />
          REVIEWS
          <Route path="reviews/new" element={<ReviewsForm token={token}/>} />
          <Route path="reviews" element={<ReviewsList token={token}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
