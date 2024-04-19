/* entire application wrapped in 'ThemeProvided' from the 'styled-components' library 
to allow reusability of stles and same theme across the application */
import { ThemeProvider, styled } from "styled-components"; 
import { lightTheme } from "./utils/Themes";
/* BrowserRouter component used to enable client-side routing. Allows to handle navigation
and rendering different components ased on the URL in the web application */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";


//Styles set for the <div> element 
//overflow-y set to auto to enable vertical scroll bar when needed (if screen is smaller)
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: auto;
  overflow-y: auto;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/" exact element={<Dashboard />} /> 
              <Route path="/workouts" exact element={<Workouts />} />
            </Routes>
          </Container>
        ) : (
          <Container>
            <Authentication />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

/* Line 38 
The path prop in a Route component specifies the URL path that the route should match.
'path="/"', means that this route will match when the URL is exactly the root URL of 
the application, i.e., when it's at the homepage. 
The 'exact' prop in a Route component ensures that the route matches the URL exactly, 
without any additional characters before or after the specified path. This is particularly 
important for the root route ("/"), because without exact, it would match every URL since every 
URL contains the root path. By adding exact, you're telling React Router to render the component 
only when the URL matches exactly "/". */