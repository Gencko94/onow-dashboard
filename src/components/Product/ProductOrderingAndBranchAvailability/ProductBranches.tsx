import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { NEW_PRODUCT_FORM_PROPS } from "../../../interfaces/products/create-new-product";

import CheckToggle from "../../reusable/CheckToggle";
import { FORM_PROPS } from "./ProductOrderingAndBranchAvailability";

const ProductBranches = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FORM_PROPS>();
  const allBranchesChecked = watch("branch_availability.all");
  const addedBranches = watch("branch_availability.branches");
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
      <Controller
        control={control}
        name="branch_availability.all"
        render={({ field: { value, onChange } }) => {
          return (
            <CheckToggle
              label="Available in all branches"
              onChange={onChange}
              checked={value}
            />
          );
        }}
      />

      {!allBranchesChecked && (
        <Controller
          control={control}
          name="branch_availability.branches"
          render={({ field: { value, onChange } }) => {
            return (
              <div className="branches-container">
                {branches.map((branch) => {
                  return (
                    <div className="branch-item">
                      <CheckToggle
                        key={branch.id}
                        label={branch.name}
                        checked={Boolean(
                          addedBranches.find((i: any) => i === branch.id)
                        )}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleBranches(branch, onChange);
                        }}
                      />
                    </div>
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
