import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/store";
import { getUserAsync } from "./features/LoginSlice";
import Error from "./page/Error";
import LoginPage from "./page/login/LoginPage";
import MainPage from "./page/main/MainPage";
import SignUpPage from "./page/signUp/SignUpPage";
import WritePage from "./page/write/WritePage";

const App = () => {
  const dispatch = useAppDispatch();
  const loggedInfo = () => {
    sessionStorage.getItem("access_token") && dispatch(getUserAsync(sessionStorage));
  };
  return (
    <>
      {loggedInfo()}
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/write" element={<WritePage />} />
      </Routes>
    </>
  );
};

export default App;
