import { Meta, StoryFn } from "@storybook/react";
import ProtectedRoute from "./protectedroute";
import { AuthContext } from "../../../context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default {
  title: "Otros/ProtectedRoute",
  component: ProtectedRoute,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            isAuthenticated: true, // Mock authentication state
          }}
        >
          {Story()}
        </AuthContext.Provider>
      </BrowserRouter>
    ),
  ],
} as Meta<typeof ProtectedRoute>;

const Template: StoryFn<typeof ProtectedRoute> = (args) => (
  <Routes>
    <Route
      path="/"
      element={<div>Public Page</div>} // Mock public page
    />
    <Route
      path="/protected"
      element={
        <ProtectedRoute {...args}>
          <div>Protected Page</div> {/* Mock protected content */}
        </ProtectedRoute>
      }
    />
  </Routes>
);

export const Authenticated = Template.bind({});
Authenticated.args = {
  children: <div>Authenticated Content</div>,
};
