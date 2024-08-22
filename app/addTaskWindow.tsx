import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form"
import { TaskModel } from "./task";
import { getDatabaseConnection, insertTask } from "./db-services";
import { router } from "expo-router"


interface FormData {
    title: string,
    priority: number,
    hours: number,
    minutes: number
}

function convertToString(value: any): string {
    if (value === undefined || value === null) {
        return "";
    }
    else {
        return value.toString();
    }
}


export default function AddTaskWindow() {

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = handleSubmit(async (data) => {
        const timeInMinutes = data.hours * 60 + data.minutes;
        const newTask: TaskModel = { id: 0, title: data.title, priority: data.priority, time: timeInMinutes };
        const db = await getDatabaseConnection();
        await insertTask(db, newTask);
        await db.closeAsync();
        router.replace("/")
    });

    return (
        <View style={styles.main}>
            <Text>Task title</Text>
            <Controller
                name={"title"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Title"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value} />
                )} />
            <Text>Task priority</Text>
            <Controller
                name={"priority"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Priority"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={convertToString(value)}
                        keyboardType="numeric" />
                )} />
            <Text>Time needed</Text>
            <Text> hours</Text>
            <Controller
                name={"hours"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="00"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={convertToString(value)}
                        keyboardType="numeric" />
                )} />
            <Text> minutes</Text>
            <Controller
                name={"minutes"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="00"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={convertToString(value)}
                        keyboardType="numeric" />
                )} />
            <Pressable onPress={onSubmit}><Text>Add task</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width: "85%",
        padding: 10,
        backgroundColor: "#7FA1C3",
        borderRadius: 15,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        color: "white",
        fontSize: 20,
    }
});