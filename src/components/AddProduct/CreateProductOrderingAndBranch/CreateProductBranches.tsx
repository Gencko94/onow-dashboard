import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import { BRANCH } from "../../../interfaces/settings/branches/branches";
import { getBranches } from "../../../utils/queries";

import CheckToggle from "../../reusable/CheckToggle";
import Heading from "../../StyledComponents/Heading";
import { thirdTabProps } from "./CreateProductOrderingAndBranchAvailability";
type GET_BRANCHES_RES = {
  data: BRANCH[];
  currentPage: number;
  lastPage: number;
};
const CreateProductBranches = () => {
  const {
    data,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GET_BRANCHES_RES>(
    "branches",
    ({ pageParam = 1 }) => getBranches(pageParam),
    {
      suspense: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );
  const { control, watch } = useFormContext<thirdTabProps>();
  const allBranchesChecked = watch("branch_availability.all");
  const allBranches = watch("branch_availability");
  const addedBranches = watch("branch_availability.branches", []);
  console.log(allBranches);
  const {
    i18n: { language },
  } = useTranslation();

  const handleToggleBranches = (
    branch: BRANCH,
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
      <Heading tag="h5" mb="1rem" color="primary">
        Product Branch Availability
      </Heading>
      <Controller
        control={control}
        name="branch_availability.all"
        defaultValue={allBranchesChecked}
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
                {data?.pages.map((group, i) => {
                  return (
                    <React.Fragment key={i}>
                      {group.data.map((branch) => (
                        <div className="branch-item">
                          <CheckToggle
                            key={branch.id}
                            label={branch.name[language]}
                            checked={Boolean(
                              addedBranches?.find((i: any) => i === branch.id)
                            )}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleToggleBranches(branch, onChange);
                            }}
                          />
                        </div>
                      ))}
                    </React.Fragment>
                  );
                })}
                {/* {branches.map((branch) => {
                  return (
                    <div className="branch-item">
                      <CheckToggle
                        key={branch.id}
                        label={branch.name}
                        checked={Boolean(
                          addedBranches?.find((i: any) => i === branch.id)
                        )}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggleBranches(branch, onChange);
                        }}
                      />
                    </div>
                  );
                })} */}
              </div>
            );
          }}
        />
      )}
    </Container>
  );
};

export default CreateProductBranches;
const Container = styled.div`
  .branches-container {
    margin-top: 1rem;
    border: ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.overlayColor};

    border-radius: 6px;
  }
  .branch-item {
    /* cursor: pointer; */
    padding: 1rem;
    display: flex;
    align-items: center;
  }
`;
