import { AuthProvider } from "./config/context/AuthContext"
import { Router } from "./router/RouterPaths.routes"

function App() {

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
