import React from "react";
import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../NestedScreen/DefaultScreen";
// import CommentsScreen from "../NestedScreen/CommentsScreen";
import MapScreen from "../NestedScreen/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultPostsScreen}
      />
      {/* <NestedScreen.Screen name="Comments" component={CommentsScreen} /> */}
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
