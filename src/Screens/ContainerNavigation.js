import { useState, useEffect, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Dashboard from "./Dashboard";
import Register from "./Register";
import Login from "./Login";
import ListTodo from "./ListTodo";
import DetailTodo from "./DetailTodo";
import Profile from "./Profile";
import AddCategory from "./AddCategory";
import AddTodo from "./AddTodo";
import UpdateTodo from "./UpdateTodo";
import { UserContext } from "../Context/UserContext";
import { API, setAuthToken } from "../Config/api";

//Create Bottom Tab & tag Navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      initialRouteName="ListTodo"
      screenOptions={({ route }) => ({
        headerMode: "screen",
        headerTintColor: "whitesmoke",
        headerStyle: { backgroundColor: "#47A9DA" },
        headerTitle: "",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "ListTodo") {
            iconName = focused ? "ios-list-circle" : "ios-list-outline";
          } else if (route.name === "AddTodo") {
            iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
          } else if (route.name === "AddCategory") {
            iconName = focused ? "md-duplicate" : "md-duplicate-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#005885",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen name="ListTodo" component={ListTodo} />
      <Tab.Screen name="AddTodo" component={AddTodo} />
      <Tab.Screen name="AddCategory" component={AddCategory} />
    </Tab.Navigator>
  );
}

const ContainerNavigation = () => {
  const [state, dispatch] = useContext(UserContext);

  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        setLogin(true);
        setAuthToken(token);

        const response = await API.get("/auth/user?$lookup=*");
        
        let payload = response?.data;
        payload.token = token;
      
        dispatch({
          type: "USER_SUCCESS",
          payload: payload,
        });

        setIsLoading(false);
      } else {
        setLogin(false);
        setIsLoading(false);
      }
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload: {},
      });
      setIsLoading(false);
      console.log("error:", err);
    }
  };

  async function isAsyncTokenExist() {
    await AsyncStorage.getItem("token");
    checkLogin();
  }

  useEffect(() => {
    checkLogin();
    isAsyncTokenExist();
  }, []);

  return (
    <>
      {state.isLogin === true ? (
        <Stack.Navigator>
          <Stack.Screen
            name="MyTab"
            component={MyTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailTodo"
            component={DetailTodo}
            options={{
              headerShown: true,
              headerMode: "screen",
              headerStatusBarHeight: -10,
              headerTintColor: "#000000",
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: "#47A9DA" },
              headerTintColor: "whitesmoke",
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="UpdateTodo"
            component={UpdateTodo}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: "#47A9DA" },
              headerTintColor: "whitesmoke",
              headerTitle: "",
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Index"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: "whitesmoke" },
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: "whitesmoke" },
              headerTitle: "",
            }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default ContainerNavigation;
