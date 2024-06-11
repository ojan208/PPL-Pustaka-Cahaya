import './App.css';
import Menu from './Menu';
import Register from './Register';
import Login from './Login';

 
function App() {
  return (
    <div >
      <div className="app-header">
        <Menu />
      </div>
      <div className="app-content">
        <Login />
      </div>
    </div>
  );
 }
 
 export default App;
