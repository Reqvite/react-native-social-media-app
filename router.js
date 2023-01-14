import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";

import ProfileScreen from "./screens/mainScreen/ProfileScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreatePostScreen from "./screens/mainScreen/CreatePostScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        name="Post"
        component={PostsScreen}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Comments" || routeName === "Map") {
              return { display: "none" };
            }
            return;
          })(route),
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="dynamic-feed" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#FF6C00",
          headerShown: false,
        })}
      />
      <MainTab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="post-add" size={32} color={color} />
          ),
          tabBarActiveTintColor: "#FF6C00",
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#FF6C00",
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};
