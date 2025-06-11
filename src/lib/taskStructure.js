class TaskStructure {
    constructor(dataCallback){
        this.dataCallback = dataCallback
        this.data = []
        this.timeouts = []
    }
    readData(){
        this.data = JSON.parse(localStorage.getItem("todo-items"))
        if (!this.data) {
            this.data = []
            this.writeData()
        }
        this.dataCallback([...this.data])
        this.setTimeouts()
    }
    writeData(){
        localStorage.setItem("todo-items", JSON.stringify(this.data))
        this.dataCallback([...this.data])
        this.setTimeouts()
    }

    setTimeouts() {
        this.timeouts.forEach(timeoutId => {
            clearTimeout(timeoutId);
        });
        this.timeouts = [];
    
        const now = new Date();
    
        this.data.forEach(element => {
            if (element.reminderTime) {
                const reminderTime = new Date(element.reminderTime);
                const timeUntilReminder = reminderTime - now;
                if (timeUntilReminder > 0) {
                    this.timeouts.push(setTimeout(() => {
                        alert("Start Task " + element.title);
                    }, timeUntilReminder));
                }
            }
    
            if (element.deadline) {
                const deadlineTime = new Date(element.deadline);
                const timeUntilDeadline = deadlineTime - now;
                if (timeUntilDeadline > 0) {
                    this.timeouts.push(setTimeout(() => {
                        alert("Deadline reached for " + element.title);
                    }, timeUntilDeadline));
                }
            }
        });
    }
    

    addTask(obj){
        this.data.push(obj)
        console.log(this.data, obj) 
        this.writeData()
    }
    updateTask(index, updatedTask) {
        this.data = this.data.map((task, i) => 
            i === index ? { ...task, ...updatedTask } : task
        );
        this.writeData()
    }

    deleteTask(taskIndex){
        this.data.splice(taskIndex, 1)
        this.writeData()
        console.log("hello Raman!", taskIndex)
    }
    
    addSubTask(index, title){
        console.log("adding subtask")
        this.data = this.data.map((task, i) => 
            i === index ? { ...task, subTask:[...task.subTask, { title:title, completed:false }] } : task
        );
        this.writeData()
    }

    updateSubTask(taskIndex, subTaskIndex, state){
        const tempData = [...this.data]
        tempData[taskIndex].subTask[subTaskIndex].completed = state
        this.writeData()
    }
    
    deleteSubTask(taskIndex, subTaskIndex){
        const tempData = [...this.data]
        tempData[taskIndex].subTask.splice(subTaskIndex, 1)
        this.writeData()
    }

    
}

export default TaskStructure