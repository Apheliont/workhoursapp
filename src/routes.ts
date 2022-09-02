import Home from "./components/Home.svelte";
import Users from "./components/Users.svelte";
import NotFound from "./components/NotFound.svelte";
import AddUser from "./components/AddUser.svelte";
import EditUser from "./components/EditUser.svelte";

export default {
  "/": Home,
  "/users": Users,
  "/users/add": AddUser,
  "/users/edit/:id": EditUser,
  "*": NotFound,
};