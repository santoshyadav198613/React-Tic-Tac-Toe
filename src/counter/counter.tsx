import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
export function Counter() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </Button>
    </div>
  );
}
