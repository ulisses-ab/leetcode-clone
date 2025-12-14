import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProblemDetail } from "./pages/ProblemDetail";
import { ProblemList } from "./pages/ProblemList";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./api/queryClient";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/" element={<ProblemList />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
