import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import AddOperation from "./AddOperation";

export default function() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="AddOperation" element={<AddOperation />} />
            </Routes>
        </BrowserRouter>
    );
}