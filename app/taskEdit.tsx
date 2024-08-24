import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";

export interface TaskModel {
    id: number,
    title: string,
    priority: number,
    time: number
}

export default function Task(props: TaskModel) {
    return (
        <View style={styles.task}>
            <Text>{props.title}</Text>
            <Text>{props.priority}</Text>
            <Text>{props.time}</Text>
        </View>
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