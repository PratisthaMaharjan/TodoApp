import { useEffect, useState, useRef } from 'react';
import styles from './App.module.css';
import Sidebar from './components/sidebar/sidebar';
import TaskList from './components/taskList/taskList';
import TaskStructure from './lib/taskStructure';

function App() {
  const [data, setData] = useState([]);
  const taskStructureRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

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
        selectedIndex={selectedIndex}
        data={data}
        taskStructure={taskStructureRef.current}
        onSelect={(selectedIndex) => setSelectedIndex(selectedIndex)}
      />

      <Sidebar 
        deleteCallback={() => {
          setSelectedIndex(-1)
          taskStructureRef.current.deleteTask(selectedIndex)
        }}
        index={selectedIndex}
        data={data[selectedIndex]}
        taskStructure={taskStructureRef.current}
      />
      
    </div>
  );
}

export default App;
