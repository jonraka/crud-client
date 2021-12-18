import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersPage from "./Pages/UsersPage";
import PageNotFoundPage from "./Pages/PageNotFoundPage";
import AddUserPage from "./Pages/AddUserPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add-user" element={<AddUserPage/>}/>
        <Route path="/" element={<UsersPage/>}/>
        <Route path="*" element={<PageNotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}