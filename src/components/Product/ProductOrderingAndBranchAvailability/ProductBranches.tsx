import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import { BRANCH } from "../../../interfaces/settings/branches/branches";
import { getBranches } from "../../../utils/queries";
import Box from "../../reusable/Box/Box";

import CheckToggle from "../../reusable/CheckToggle";
import Heading from "../../StyledComponents/Heading";
import { FORM_PROPS } from "./ProductOrderingAndBranchAvailability";
type GET_BRANCHES_RES = {
  data: BRANCH[];
  currentPage: number;
  lastPage: number;
};
const ProductBranches = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FORM_PROPS>();
  const {
    i18n: { language },
  } = useTranslation();
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
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );
  const allBranchesChecked = watch("branch_availability.all");
  const addedBranches = watch("branch_availability.branches");
  console.log(addedBranches);

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
    <Box type="titled" boxTitle="Product Branch availability">
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
              </div>
            );
          }}
        />
      )}
    </Box>
  );
};

export default ProductBranches;
