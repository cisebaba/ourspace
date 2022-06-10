import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
// import ListJobs from './JobsPage';
import EventForm from "./Events/CreateEventForm.js";
import MainPage from "./MainPage";
import EventsList from "./Events/EventsList";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Logout from "./Auth/Logout";
import { useToken } from "./authApi";
import JobsList from "./Jobs/JobsList";
import PostsList from "./Forum/ListPosts/ListPosts";
import PostForm from "./Forum/Forms/CreatePostForm";
import ForumApp from "./Forum/ForumApp";
import PostDetail from "./Forum/PostDetail";
import CommentList from "./Forum/CommentList";
import CommentForm from "./Forum/Forms/CommentForm";
//import PostsList from "./Forum/ListPosts";
//import PostForm from "./Forum/CreatePostForm";
import ReviewsForm from "./Reviews/ReviewsForm";
import ReviewsList from "./Reviews/ReviewsList";
import MentorForm from "./Mentorship/MentorForm";

// Still working on JobsPage - not functioning yet

function App() {
  const [token, login, logout, signup] = useToken();
  return (
    <>
      <BrowserRouter>
        <Nav token={token} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="logout" element={<Logout logout={logout} />} />
          <Route path="login" element={<Login token={token} login={login} />} />
          <Route
            path="signup"
            element={<Signup token={token} signup={signup} />}
          />
          <Route path="events" index element={<EventsList />} />
          <Route path="events/new" element={<EventForm token={token} />} />
          <Route path="jobs" element={<JobsList />} />
          <Route path="forum" element={<ForumApp />} />
          <Route path="posts/:post_id" element={<PostDetail />} />
          <Route path="posts/:post_id/comment/form" element={<CommentForm />} />
          <Route path="mentorship/new" element={<MentorForm token={token} />} />
          <Route path="logout" element={<Logout logout={logout} />} />
          <Route path="login" element={<Login token={token} login={login} />} />
          <Route
            path="signup"
            element={<Signup token={token} signup={signup} />}
          />
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/new" element={<PostForm />} />
          <Route path="reviews/new" element={<ReviewsForm />} />
          <Route path="reviews" element={<ReviewsList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
