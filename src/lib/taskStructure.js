class TaskStructure {
    constructor(dataCallback){
        this.dataCallback = dataCallback
        this.data = []
    }
    readData(){
        this.data = [{
            title: 'task1',
            created: null,
            status: 'todo',
            deadline: null,
            progressTime: null,
            finishedTime: null,
            reminderTime: null,
            subTask:[
                {
                    title: 'sub task1',
                    completed: false
                }
            ]
        },
        {
            title: 'task1',
            created: null,
            status: 'todo',
            deadline: null,
            progressTime: null,
            finishedTime: null,
            reminderTime: null,
            subTask:[
                {
                    title: 'sub task1',
                    completed: false
                }
            ]
        }]
        this.dataCallback([...this.data])
    }
    writeData(){
        this.dataCallback([...this.data])
    }
    addTask(obj){
        this.data.push(obj)
        console.log(this.data, obj) 
        this.writeData()
    }
    addSubTask(){
        console.log("adding subtask")
    }
}

export default TaskStructure