import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { NEW_PRODUCT } from "../../../interfaces/products/products";

import CheckToggle from "../../reusable/CheckToggle";
import Checkbox from "../../reusable/Inputs/Checkbox";

const ProductBranches = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<NEW_PRODUCT>();
  const allBranchesChecked = watch("availability.all");
  const addedBranches = watch("availability.branches");
  const branches = [
    { id: 1, name: "Main Branch" },
    { id: 2, name: "Salmiyah Branch" },
  ];
  const handleToggleBranches = (
    branch: { name: string; id: number },
    onChange: (...event: any[]) => void
  ) => {
    const found = addedBranches.find((i: any) => i === branch.id);

    console.log(addedBranches);
    if (!found) {
      onChange([...addedBranches, branch.id]);
    } else {
      onChange(addedBranches.filter((i: any) => i !== branch.id));
    }
  };
  return (
    <Container>
      <div className="title-container">
        <h5>Product Branch Availability</h5>
      </div>
      <CheckToggle
        label="Available in all branches"
        control={control}
        name="availability.all"
      />
      {!allBranchesChecked && (
        <Controller
          control={control}
          name="availability.branches"
          render={({ field: { value, onChange } }) => {
            return (
              <div className="branches-container">
                {branches.map((branch) => {
                  return (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBranches(branch, onChange);
                      }}
                      key={branch.id}
                      className="branch-item"
                    >
                      {branch.name}
                      <Checkbox
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleBranches(branch, onChange);
                        }}
                        checked={Boolean(
                          addedBranches.find((i: any) => i === branch.id)
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            );
          }}
        />
      )}
    </Container>
  );
};

export default ProductBranches;
const Container = styled.div`
  .title-container {
    margin-bottom: 1rem;
    color: ${(props) => props.theme.mainColor};
  }
  .branches-container {
    margin-top: 1rem;
    border: ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.overlayColor};

    border-radius: 6px;
  }
  .branch-item {
    cursor: pointer;
    padding: 1rem;
    display: flex;
    align-items: center;
  }
`;
// const Checkbox = styled.label`
//   display: block;
//   position: relative;
//   margin: 0 1rem;

//   cursor: pointer;
//   font-size: 0.9rem;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;

//   input {
//     position: absolute;
//     opacity: 0;
//     cursor: pointer;
//     height: 0;
//     width: 0;
//   }
//   .check {
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 22px;
//     width: 22px;
//     background-color: #fff;
//     border: ${(props) => props.theme.border};
//     border-radius: 6px;
//     &::after {
//       content: "";
//       position: absolute;
//       display: none;
//       left: 7px;
//       top: 4px;
//       width: 5px;
//       height: 10px;
//       border: solid white;
//       border-width: 0 3px 3px 0;
//       -webkit-transform: rotate(45deg);
//       -ms-transform: rotate(45deg);
//       transform: rotate(45deg);
//     }
//   }
//   input:checked ~ .check {
//     background-color: ${(props) => props.theme.mainColor};
//   }
//   input:checked ~ .check:after {
//     display: block;
//   }
// `;
