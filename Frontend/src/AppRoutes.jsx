import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchUser from './Features/TeamMates/pages/SearchUser';
import App from './App.jsx';
import ProjectDetail from './Features/Projects/pages/projectDetail.jsx';
import TaskDetail from './Features/Tasks/pages/TaskDetail.jsx';
import Login from './Features/Authentication/Pages/Login.jsx';
import Register from './Features/Authentication/Pages/Register.jsx';
import ProtectedRoute from './Features/Authentication/components/ProtectedRoute.jsx';


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<App />}></Route>
                    <Route path="/team/search" element={<SearchUser />}></Route>
                    <Route path="/project/:projectId" element={<ProjectDetail />}></Route>
                    <Route path="/task/:taskId" element={<TaskDetail />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
