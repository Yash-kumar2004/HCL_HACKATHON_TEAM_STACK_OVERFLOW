import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import React from 'react';
import Home from './components/Home.jsx';
import Authentication from './components/Authentication.jsx';
import Wellness from './components/Wellness.jsx';
import Dashboard from "./components/Dashboard.jsx"
import Profile from "./components/Profile.jsx"
const router = createBrowserRouter([
             {
              path:"/",
              element:<Home/>
             },
             {
              path:"/auth",
              element:<Authentication/>
             },{
              path:'/dashboard',
              element:<Dashboard/>
             },
             {
              path:'/profile',
              element:<Profile/>
             }/*,
             {
                 path:"/dashboard",
                 element:<Dashboard/>
             },

             {
              path:"/loginpage",
              element:<Loginpage/>
             },
             {
              path:"/register",
              element:<Registrationpage/>
             },
             {
              path:"/assigned",
              element:<Assigned/>
             },
             {
              path:"/searchpage",
              element:<Searchpage/>
             }*/
            
])

function App() {
  
return (
      <>
      <RouterProvider router={router} />
      
      </>
    )
  
}

          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["patient"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/providers" element={<ProtectedRoute><ProvidersList /></ProtectedRoute>} />
          <Route path="/book/:id" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />

          <Route path="/provider/dashboard" element={<ProtectedRoute allowedRoles={["provider"]}><ProviderDashboard /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
