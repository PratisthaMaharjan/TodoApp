import styles from './App.module.css';
import Sidebar from './components/sidebar/sidebar';
import TaskList from './components/taskList/taskList';

function App() {
  return (
    <div className={styles.container}>
      <TaskList/>
      <Sidebar/>
    </div>
  );
}

export default App;
