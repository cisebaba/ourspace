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
import PostsList from "./Forum/Components/PostsList";
import PostForm from "./Forum/Api/Forms/PostForm";
import ListView from "./Forum/Views/ListView";
import DetailView from "./Forum/Views/DetailView";
import CommentForm from "./Forum/Api/Forms/CommentForm";
import ReviewsForm from "./Reviews/ReviewsForm";
import ReviewsList from "./Reviews/ReviewsList";
import MentorForm from "./Mentorship/MentorForm";
import MentorList from "./Mentorship/MentorList";
import ProfileForm from "./Auth/Profile/ProfileForm";
import ProfilePage from "./Auth/Profile/ProfilePage";

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
          <Route path="signup" element={<Signup token={token} signup={signup} />}
          />
          {/* PROFILE  */}
          <Route path="/profile/new" element={<ProfileForm token={token} />} />
          <Route path="/profile" element={<ProfilePage token={token} />} />
          {/* EVENTS  */}
          <Route path="events" index element={<EventsList token={token}/>} />
          <Route path="events/new" element={<EventForm token={token} />} />
          {/* JOBS */}
          <Route path="jobs" element={<JobsList />} />
          {/* MENTORSHIP */}
          <Route path="mentorship" element={<MentorList token={token} />} />
          <Route path="mentorship/new" element={<MentorForm token={token} />} />
          {/* FORUM */}
          <Route path="forum" element={<ListView token={token} />} />
          <Route path="posts/:post_id" element={<DetailView token={token} />} />
          <Route
            path="posts/:post_id/comment/form"
            element={<CommentForm token={token} />}
          />
          <Route path="posts" element={<PostsList token={token} />} />
          <Route path="posts/new" element={<PostForm token={token} />} />
          REVIEWS
          <Route path="reviews/new" element={<ReviewsForm token={token} />} />
          <Route path="reviews" element={<ReviewsList token={token} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
