import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "@pages/HomePage";
import { LoginPage } from "@pages/LoginPage";
import { CreateUserPage } from "@pages/CreateUserPage";
import { EditUserPage } from "@pages/EditUserPage";
import { ProtectedRoute } from "@components/ProdectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user/create" element={<CreateUserPage />} />
                    <Route path="/user/edit/:id" element={<EditUserPage />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
