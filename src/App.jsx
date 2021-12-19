import { Routes, Route } from 'react-router-dom';
import UsersPage from './Pages/UsersPage';
import NotFoundPage from './Pages/NotFoundPage';
import AddUserPage from './Pages/AddUserPage';
import EditUserPage from './Pages/EditUserPage';
import { Navigate } from 'react-router-dom';
import DeleteUserPage from './Pages/DeleteUserPage';

export default function App() {
  return (
    <Routes>
      <Route path="/users/add" element={<AddUserPage />} />
      <Route path="/users/edit/:userId" element={<EditUserPage />} />
      <Route path="/users/delete/:userId" element={<DeleteUserPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/" element={<Navigate to="/users" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
