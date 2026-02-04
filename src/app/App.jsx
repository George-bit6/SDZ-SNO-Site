
import UserProfile from "./pages/UserProfile";
import "../styles/fonts.css";

let User = {

  firstName: "George",
  lastName: "Bou Faysal",
  section: "Rover",
  color: "red.600",

}

let tasks = {

  tasksTitle: "Scout Task",
  taskList: ["Build a Campfire", "Know the 16 directions", "Participate in 3 camps", "Know the organization of a camp"]
}

export default function App() {
  return (
    <>
      <UserProfile User={User}></UserProfile>
    </>
  );
}
