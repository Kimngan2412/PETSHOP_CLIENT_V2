import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
function ItemCounter({ count, maxCount, onChange }) {
  const [state, dispatch] = useReducer(reducer, { count: count ?? 1 });

  const increment = () => {
    if (state.count < maxCount) {
      dispatch({ type: "increment" });
      onChange && onChange(state.count + 1);
    }
  };
  const decrement = () => {
    if (state.count > 1) {
      dispatch({ type: "decrement" });
      onChange && onChange(state.count - 1);
    }
  };

  return (
    <>
      <button onClick={decrement} type="button">
        <i className="bi bi-dash"></i>
      </button>
      <span style={{ margin: "0 20px", fontFamily: "Cabin" }}>
        {state.count}
      </span>
      <button onClick={increment} type="button">
        <i className="bi bi-plus"></i>
      </button>
    </>
  );
}
export default ItemCounter;
