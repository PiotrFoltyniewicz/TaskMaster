import { Text, View, StyleSheet, Pressable } from "react-native";
import Tasklist from "./tasklist";
import { useState, useEffect, useCallback } from "react";
import { getDatabaseConnection, createDBStructure, getAllTasks, insertTask, insertForTesting, deleteData } from "./db-services";
import { TaskModel } from "./task"
import { Link } from "expo-router";

/* 
  TODO
  - clicking on Add new task opens new page on full screen where user can add new task
  - clicking on Suggest task opens new page with clock to choose how much free time user has and then shows suggested task and suggested task is highlighted in the list
  - clicking on the task opens new page with options to check the task, change info and highlight or turn off highlight
*/

export default function Index() {
  // Fetching data from database and storing it in the state
  const fetchDataCallback = useCallback(async () => {
    const db = await getDatabaseConnection();
    await createDBStructure(db);
    //await deleteData(db);
    await insertForTesting(db);
    const items = await getAllTasks(db);
    setTasks(items);
    await db.closeAsync();
  }, [])


  const [tasks, setTasks] = useState<TaskModel[]>([]);
  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  function suggestTask() {

  }

  return (
    <View style={styles.layout}>
      <Tasklist tasks={tasks} />
      <View style={styles.buttonWrapper}>
        <Link href={{ pathname: "/" }} style={styles.buttonStyle}>Suggest task</Link>
        <Link href={{ pathname: "/addTaskWindow" }} style={styles.buttonStyle}>Add new task</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5EDED"
  },
  buttonWrapper: {
    flex: 0.3,
    backgroundColor: "#E2DAD6",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonStyle: {
    backgroundColor: "#6482AD",
    width: "85%",
    padding: 10,
    borderRadius: 15,
    textAlign: "center",
    color: "white",
    fontSize: 28,
  }
});