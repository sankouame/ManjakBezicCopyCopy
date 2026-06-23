import { createBrowserRouter } from "react-router";
import { Splash } from "./screens/Splash";
import { Onboarding1 } from "./screens/Onboarding1";
import { Onboarding2 } from "./screens/Onboarding2";
import { Onboarding3 } from "./screens/Onboarding3";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { ForgotPassword } from "./screens/ForgotPassword";
import { MainLayout } from "./components/MainLayout";
import { Home } from "./screens/Home";
import { Feed } from "./screens/Feed";
import { PostDetail } from "./screens/PostDetail";
import { UserProfile } from "./screens/UserProfile";
import { CreatePost } from "./screens/CreatePost";
import { DirectMessage } from "./screens/DirectMessage";
import { Discussions } from "./screens/Discussions";
import { ConversationDetail } from "./screens/ConversationDetail";
import { News } from "./screens/News";
import { NewsDetail } from "./screens/NewsDetail";
import { EventDetail } from "./screens/EventDetail";
import { Videos } from "./screens/Videos";
import { VideoDetail } from "./screens/VideoDetail";
import { Associations } from "./screens/Associations";
import { AssociationDetail } from "./screens/AssociationDetail";
import { Quiz } from "./screens/Quiz";
import { QuizDetail } from "./screens/QuizDetail";
import { VillagesMap } from "./screens/VillagesMap";
import { Search } from "./screens/Search";
import { Notifications } from "./screens/Notifications";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import { NotFound } from "./screens/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/onboarding-1",
    Component: Onboarding1,
  },
  {
    path: "/onboarding-2",
    Component: Onboarding2,
  },
  {
    path: "/onboarding-3",
    Component: Onboarding3,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "feed",
        Component: Feed,
      },
      {
        path: "posts/:id",
        Component: PostDetail,
      },
      {
        path: "profile/:id",
        Component: UserProfile,
      },
      {
        path: "create-post",
        Component: CreatePost,
      },
      {
        path: "messages/:id",
        Component: DirectMessage,
      },
      {
        path: "discussions",
        Component: Discussions,
      },
      {
        path: "discussions/:id",
        Component: ConversationDetail,
      },
      {
        path: "news",
        Component: News,
      },
      {
        path: "news/:id",
        Component: NewsDetail,
      },
      {
        path: "events/:id",
        Component: EventDetail,
      },
      {
        path: "videos",
        Component: Videos,
      },
      {
        path: "videos/:id",
        Component: VideoDetail,
      },
      {
        path: "associations",
        Component: Associations,
      },
      {
        path: "associations/:id",
        Component: AssociationDetail,
      },
      {
        path: "quiz",
        Component: Quiz,
      },
      {
        path: "quiz/:id",
        Component: QuizDetail,
      },
      {
        path: "villages-map",
        Component: VillagesMap,
      },
      {
        path: "search",
        Component: Search,
      },
      {
        path: "notifications",
        Component: Notifications,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);