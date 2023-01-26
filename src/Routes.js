import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import AddOperation from "./AddOperation";
import Login from "./Login";

export default function() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="AddOperation" element={<AddOperation />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}