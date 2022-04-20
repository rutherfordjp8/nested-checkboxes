import {
  checkNestedCheckboxesAreChecked,
  markNestedCheckboxes,
} from "./helpers/nestedCheckboxHelpers";

export type CheckboxOption = {
  [key: string]: boolean | CheckboxOption;
};

/**
 * Takes in an object of checkboxes and onchange method.
 *
 * CheckboxOption example:
 * {
 *   foo: true,
 *   bar: false,
 *   group1: {
 *     level2: true,
 *     level2option2: false,
 *     nested: {
 *       option: true,
 *     },
 *   },
 * };
 */
const NestedCheckbox = ({
  checkboxes,
  onChange,
}: {
  checkboxes: CheckboxOption;
  onChange: (checkboxes: CheckboxOption) => void;
}) => {
  const onChangeCheckbox = (key: any, value: any) => {
    onChange({ ...checkboxes, [key]: value });
  };

  const onChangeGroupCheckbox = (key: any) => {
    let newCheckboxesState = markNestedCheckboxes(
      checkboxes[key] as CheckboxOption,
      !checkNestedCheckboxesAreChecked(checkboxes[key])
    );
    onChangeCheckbox(key, newCheckboxesState);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Object.keys(checkboxes).map((key) => {
        // if boolean then return a checkbox
        if (typeof checkboxes[key] === "boolean")
          return (
            <div style={{ display: "flex" }}>
              {key}{" "}
              <input
                type="checkbox"
                checked={checkboxes[key] as unknown as boolean}
                onChange={() => onChangeCheckbox(key, !checkboxes[key])}
              />
            </div>
          );

        return (
          <>
            <div style={{ color: "red" }}>
              {key}{" "}
              <input
                type="checkbox"
                checked={checkNestedCheckboxesAreChecked(checkboxes[key])}
                onChange={() => onChangeGroupCheckbox(key)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: "1em",
              }}
            >
              <NestedCheckbox
                checkboxes={checkboxes[key] as unknown as CheckboxOption}
                onChange={(value) => {
                  onChangeCheckbox(key, value);
                }}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default NestedCheckbox;
