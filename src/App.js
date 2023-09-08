import { useState } from "react";
import PropTypes from "prop-types";

CreateNewHabit.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  count: PropTypes.number,
};

const habits = [
  { name: "Бег", goalPerDay: 60, emoji: "🏃‍♂️", id: 0 },
  { name: "Чтение", goalPerDay: 15, emoji: "📖", id: 1 },
  { name: "Плавание", goalPerDay: 60, emoji: "🏊‍♀️", id: 2 },
  { name: "Немецкий", goalPerDay: 30, emoji: "📚", bgColor: "#F5EEE7", id: 3 },
];

export default function App() {
  const [habitsList, setHabitsList] = useState(habits);

  function addHabit(name, count) {
    setHabitsList((habitsList) => [
      ...habitsList,
      { name: name, id: name + 1, goalPerDay: count },
    ]);
  }

  function deleteHabit(id) {
    // console.log("id");
    const remainingHabitsList = habitsList.filter((habit) => id !== habit.id);
    setHabitsList(remainingHabitsList);
  }

  return (
    <div className="habitContainer">
      <HabitsList
        addHabit={addHabit}
        deleteHabit={deleteHabit}
        habitsList={habitsList}
      />
    </div>
  );
}

function HabitsItem({ habit, deleteHabit }) {
  // console.log(deleteHabit);
  return (
    <li className="habitItem" style={{ backgroundColor: habit.bgColor }}>
      <h3>{habit.name}</h3>
      <p>
        {habit.goalPerDay} мин/день<span>{habit.emoji}</span>
      </p>
      <button onClick={() => deleteHabit(habit.id)}>&#10006;</button>
    </li>
  );
}

function CreateNewHabit(props) {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    if (name === "" || count === "") return;
    props.addHabit(name, count);
    setName("");
    setCount("");
    // console.log(name, count);
  }

  return (
    <li className="habitItem habitItem--new" style={{}}>
      <form onSubmit={handleSubmit}>
        <input
          // type="text"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          placeholder="Добавить новую"
        ></input>
        <input
          // type="text"
          value={count}
          onChange={(evt) => setCount(evt.target.value)}
          placeholder="Добавить инкремент"
        ></input>
        <input type="submit" value="+" />
      </form>
    </li>
  );
}

function HabitsList(props) {
  return (
    <>
      <h1 className="habitListTitle">Список привычек</h1>
      <ul className="habitList">
        {props.habitsList.map((habit) => (
          <HabitsItem
            habit={habit}
            key={habit.id}
            deleteHabit={props.deleteHabit}
          />
        ))}
        <CreateNewHabit addHabit={props.addHabit} />
      </ul>
    </>
  );
}
