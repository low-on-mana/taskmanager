import './App.css';
import TaskManager from './components/TaskManager';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TaskManager/>
      </LocalizationProvider>
      </header>
    </div>
  );
}

export default App;
