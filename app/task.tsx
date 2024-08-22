import { Text, View, StyleSheet, Pressable } from "react-native";

export interface TaskModel {
  id: number,
  title: string,
  priority: number,
  time: number
}

export default function Task(props: TaskModel) {
  return (
    <Pressable style={styles.task}>
      <Text style={styles.taskText}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  task: {
    width: "85%",
    padding: 10,
    backgroundColor: "#7FA1C3",
    borderRadius: 15,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "white",
    fontSize: 20,
  }
});