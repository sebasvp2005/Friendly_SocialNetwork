import {createBrowserRouter} from "react-router-dom";
import {NotFoundPage} from "../public/pages/NotFoundPage.tsx";
import {AuthWall} from "../security/components/AuthWall.tsx";
import {HomePage} from "../posts/pages/HomePage.tsx";
import {LoginPage} from "../security/pages/LoginPage.tsx";
import { Profile } from "../my-profile/pages/profile.tsx";
import { SearchPage } from "../search/pages/Search.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthWall />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "*",
    element: <NotFoundPage />
  },
  {
    path: "/profile/:profile_user",
    element: <Profile/>
  },
  {
    path: "/search/:user",
    element: <SearchPage/>
  }
]);