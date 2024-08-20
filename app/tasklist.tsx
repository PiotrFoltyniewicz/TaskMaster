import { Text, View, StyleSheet, ScrollView } from "react-native";
import Task from "./task";
import { TaskModel } from "./task";
import tasks from "./taskData";

export default function Tasklist({tasks} : {tasks: Array<TaskModel>}) {
    const mapped = tasks.map(task => <Task 
                                        key={task.id}
                                        id={task.id}
                                        title={task.title} 
                                        priority={task.priority}
                                        time={task.time}/>)
  return (
    <ScrollView contentContainerStyle={styles.list} style={styles.containerStyle}>
        {mapped}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    containerStyle:{
        marginTop: 20,
        width: "90%",
        flex: 10,
    },
    list: {
        alignItems: "center"
    }
});