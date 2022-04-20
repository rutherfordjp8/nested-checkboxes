import NestedCheckbox, { CheckboxOption } from "./NestedCheckbox";
import React, { useState } from "react";

const defaultNestedCheckboxesState = {
  foo: true,
  bar: false,
  group1: {
    level2: true,
    level2option2: false,
    nested: {
      option: true,
    },
  },
};

const App = () => {
  const [checkboxes, setCheckboxes] = useState<CheckboxOption>(
    defaultNestedCheckboxesState
  );

  return (
    <div style={{ padding: "2em" }}>
      <NestedCheckbox checkboxes={checkboxes} onChange={setCheckboxes} />
    </div>
  );
};

export default App;
