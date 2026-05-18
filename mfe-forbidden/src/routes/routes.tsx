import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ForbiddenPage } from '@/pages';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/forbidden" element={<ForbiddenPage />} />

        <Route path="*" element={<Navigate to="/forbidden" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
