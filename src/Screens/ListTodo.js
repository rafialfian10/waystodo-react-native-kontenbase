import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";

import DisplayProfile from "../Component/displayProfile";
import SearchTodo from "../Component/searchTodo";
import FilterDate from "../Component/filterDate";
import FilterCategory from "../Component/filterCategory";
import FilterStatus from "../Component/filterStatus";
import TodoMap from "../Component/todoMap";
import RefreshPage from "../Component/refreshPage";
import { GetUser } from "../Component/Common/Hooks/getUser";
import { GetTodos } from "../Component/Common/Hooks/getTodos";
import { GetCategories } from "../Component/Common/Hooks/getCategories";
import { UserContext } from "../Context/UserContext";
import { UserPhotoContext } from "../Context/userPhotoContext";

const ListTodo = ({ navigation }) => {
  const [state, dispatch] = useContext(UserContext);
  const { photo, setPhoto } = useContext(UserPhotoContext);

  const { user, refetchUser } = GetUser();
  const { todos, isLoadingTodos, refetchTodos } = GetTodos();
  const { categories, refetchCategories } = GetCategories();

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState();
  const [filterCategory, setFilterCategory] = useState();
  const [filterStatus, setFilterStatus] = useState(false);

  useEffect(() => {
    refetchUser();
    refetchTodos();
    refetchCategories();
  }, [user, todos, categories]);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const photo = await AsyncStorage.getItem("photo");

        if (photo) {
          setPhoto(photo);
        }
      } catch (error) {
        console.log("Failed to fetch profile photo from AsyncStorage", error);
      }
    };

    fetchProfilePhoto();
  }, [photo]);

  const handleRefresh = () => {
    refetchUser();
    refetchTodos();
    refetchCategories();
  };

  return (
    <SafeAreaView style={styles.containerListTodo}>
      {isLoadingTodos ? (
        <ActivityIndicator style={styles.loadingUser} />
      ) : (
        <View>
          <DisplayProfile
            navigation={navigation}
            state={state}
            user={user}
            todos={todos}
            photo={photo}
            dispatch={dispatch}
          />
          <RefreshPage pageStyle={""} onRefresh={handleRefresh}>
            <View style={styles.containerSearchFilter}>
              <SearchTodo
                search={search}
                setSearch={setSearch}
                setFilterDate={setFilterDate}
                setFilterStatus={setFilterStatus}
                setFilterCategory={setFilterCategory}
              />
              <View style={styles.contentFilter}>
                <FilterDate
                  filterDate={filterDate}
                  setFilterDate={setFilterDate}
                  setSearch={setSearch}
                  setFilterStatus={setFilterStatus}
                  setFilterCategory={setFilterCategory}
                />
                <FilterCategory
                  categories={categories}
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  setSearch={setSearch}
                  setFilterDate={setFilterDate}
                  setFilterStatus={setFilterStatus}
                />
                <FilterStatus
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  setSearch={setSearch}
                  setFilterDate={setFilterDate}
                  setFilterCategory={setFilterCategory}
                />
              </View>
              {todos
                ?.filter((todo) => {
                  if (search == "") {
                    return todo;
                  } else if (
                    todo?.title
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase())
                  ) {
                    return todo;
                  }
                })
                .filter((todo) => {
                  if (filterDate) {
                    return moment(todo?.date).isSame(filterDate, "day");
                  } else {
                    return true;
                  }
                })
                .filter((todo) => {
                  if (filterCategory) {
                    return todo?.categoryId?.some(
                      (categoryId) => categoryId?._id === filterCategory
                    );
                  } else {
                    return true;
                  }
                })
                .filter((todo) => {
                  if (filterStatus === "0") {
                    return !todo?.isDone;
                  } else if (filterStatus === "1") {
                    return todo?.isDone;
                  } else {
                    return todo;
                  }
                })
                .map((todo, i) => (
                  <TodoMap
                    key={i}
                    navigation={navigation}
                    state={state}
                    todo={todo}
                    refetchUser={refetchUser}
                    refetchTodos={refetchTodos}
                    refetchCategories={refetchCategories}
                  />
                ))}
            </View>
          </RefreshPage>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerListTodo: {
    flex: 1,
  },
  loadingUser: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerSearchFilter: {
    marginBottom: 200,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  contentFilter: {
    width: "95%",
    marginBottom: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
});

export default ListTodo;
