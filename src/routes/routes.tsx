import DefaultLayout from "@/layouts/Default";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";

const WebRouter = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default WebRouter;
