import { Text, View, StyleSheet } from "react-native";

interface Props{
    title: string; 
    priority: number;
    time: number;
}

export default function Task({ title, priority, time}: Props) {
  return (
    <View style={styles.task}>
        <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    task:{
        width: "85%",
        backgroundColor: "#7FA1C3",
        borderRadius: 10,
        margin: 5,
        fontSize: 40,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    }
});