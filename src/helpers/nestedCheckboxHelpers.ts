import { CheckboxOption } from "../NestedCheckbox";

/**
 * If any nested checkboxes are NOT true then return false.
 * @param checkboxOption The group (CheckboxOption) or boolean to compare if true or not.
 * @returns
 */
export const checkNestedCheckboxesAreChecked = (
  checkboxOption: CheckboxOption | boolean
): boolean => {
  if (typeof checkboxOption === "boolean") return checkboxOption;

  return Object.values(checkboxOption).every((option) => {
    return checkNestedCheckboxesAreChecked(option);
  });
};

/**
 * This function is used by group checkboxes to mark all children as true or false.
 * @param checkboxOption An object to modify the values to be equal to markAs
 * @param markAs
 * @returns
 */
export const markNestedCheckboxes = (
  checkboxOption: CheckboxOption,
  markAs: boolean
): CheckboxOption => {
  Object.keys(checkboxOption).forEach((option) => {
    if (typeof checkboxOption[option] === "boolean") {
      checkboxOption[option] = markAs;
    } else {
      checkboxOption[option] = markNestedCheckboxes(
        checkboxOption[option] as CheckboxOption,
        markAs
      );
    }
  });
  return checkboxOption;
};
