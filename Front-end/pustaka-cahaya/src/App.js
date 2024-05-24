import './App.css';
import Menu from './Menu';
import Register from './Register';

 
function App() {
  return (
    <div >
      <div className="app-header">
        <Menu />
      </div>
      <div className="app-content">
        <Register />
      </div>
    </div>
  );
 }
 
 export default App;