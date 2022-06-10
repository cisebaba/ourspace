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
          <Route path="posts" element={<PostsList />}>
            <Route path="new" element={<PostForm />} />
          </Route>
          <Route path="forum" element={<ForumApp />} />
          <Route path="posts/:post_id" element={<PostDetail />} />
          <Route path="posts/:post_id/comment/form" element={<CommentForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
