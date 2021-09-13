import { useContext, useMemo } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Button from "../../../reusable/Button";
import TableHead from "../../../reusable/TableHead/TableHead";
import Flex from "../../../StyledComponents/Flex";
export interface thirdTabBranchInfo {}

const NewBranchDeliveryZones = () => {
  const { t } = useTranslation();
  // const { updateData, setActiveTab, submitForm } = useContext(NewBranchContext);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<thirdTabBranchInfo>({
    defaultValues: {
      working_hours: {
        saturday: { enabled: true, from: "09:00", to: "21:00" },
        sunday: { enabled: true, from: "09:00", to: "21:00" },
        monday: { enabled: true, from: "09:00", to: "21:00" },
        tuesday: { enabled: true, from: "09:00", to: "21:00" },
        wednesday: { enabled: true, from: "09:00", to: "21:00" },
        thursday: { enabled: true, from: "09:00", to: "21:00" },
        friday: { enabled: true, from: "09:00", to: "21:00" },
      },
    },
  });
  const onSubmit: SubmitHandler<thirdTabBranchInfo> = (data) => {
    console.log(data);

    // setActiveTab?.(2);
    // updateData?.(watch());
  };
  const onError: SubmitErrorHandler<thirdTabBranchInfo> = (errors) => {
    console.log(errors);
  };
  const cols = useMemo(
    () => [
      { title: "country", sortable: false },
      { title: "delivery_time", sortable: false },
      { title: "delivery_fee", sortable: false },
      { title: "minimum_order", sortable: false },
    ],
    []
  );
  return (
    <Container onSubmit={handleSubmit(onSubmit, onError)}>
      <Flex justify="flex-end">
        <Button color="blue" withTransition type="submit">
          Next
        </Button>
      </Flex>
      <div className="title-container">
        <h5>Branch Delivery Zones</h5>
      </div>
      <div className="box">
        <TableHead gap="2rem" cols={cols} gridCols="1fr 1fr 1fr 1fr" />
      </div>
    </Container>
  );
};

export default NewBranchDeliveryZones;
const Container = styled.form(
  ({ theme: { breakpoints, primary, shadow, border } }) => `
.title-container {
  padding: 1rem 0;
  color: ${primary};
}
.box {
 
  border: ${border};
  border-radius: 6px;
  }

`
);
