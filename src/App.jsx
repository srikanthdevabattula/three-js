import { BrowserRouter } from "react-router-dom";
import Routers from "./routes";
import RoomScene from "./Pages/Room/Room";

function App() {
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
      <RoomScene />
    </div>
	);
}

export default App;
