import { useEffect, useState, useRef } from 'react';
import styles from './App.module.css';
import Sidebar from './components/sidebar/sidebar';
import TaskList from './components/taskList/taskList';
import TaskStructure from './lib/taskStructure';

function App() {
  const [data, setData] = useState([]);
  const taskStructureRef = useRef(null);


  useEffect(() => {
    taskStructureRef.current = new TaskStructure((val) => setData(val));
    taskStructureRef.current.readData();
  }, []);

  
  if (!taskStructureRef.current) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.container}>
      <TaskList 
        data={data}
        addTask={(obj) => taskStructureRef.current.addTask(obj)}
      />
      <Sidebar />
    </div>
  );
}

export default App;
