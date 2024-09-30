import DefaultLayout from "@/layouts/Default";
import { Components } from "@/pages/Components/Components";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";

const WebRouter = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<Components />} />
      </Route>
    </Routes>
  );
};

export default WebRouter;
