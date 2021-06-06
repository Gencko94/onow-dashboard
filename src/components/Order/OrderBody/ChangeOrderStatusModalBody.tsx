import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BsCheck } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import Select from "react-select";
import styled from "styled-components";
import { orderStatuses } from "../../../fakeData/fakeOrderStatuses";

const ChangeOrderStatusModalBody = ({ portal }: { portal: any }) => {
  const {
    i18n: { language },
  } = useTranslation();
  const selectStyles = useMemo(() => {
    return {
      control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: "#ececec",
        fontSize: "0.9rem",
        minHeight: "35px",
      }),
      indicatorContainer: (provided: any, state: any) => ({
        ...provided,
        padding: state.isFocused ? "0.4rem" : "0.4rem",
      }),
      option: (provided: any) => ({
        ...provided,
        fontSize: "0.9rem",
      }),
      menuPortal: (provided: any) => ({
        ...provided,
        zIndex: 999,
      }),
    };
  }, []);
  const selectTypes = [
    { id: 1, name: "Single Select" },
    { id: 2, name: "Multiple Select" },
  ];
  return (
    <Container>
      <div className="content">
        <Select
          styles={selectStyles}
          placeholder="Select Order Type"
          options={orderStatuses}
          defaultValue={orderStatuses[0]}
          isSearchable={false}
          getOptionLabel={(option) => option.title[language]}
          getOptionValue={(option) => option.id.toString()}
          menuPortalTarget={portal.current}
          onChange={(value) => {
            // onChange(value?.id);
          }}
        />
      </div>
      <ButtonsContainer>
        <Button type="button">
          <BsCheck size={30} />
          <p>Change Status</p>
        </Button>
        <Button red type="button">
          <MdCancel size={30} />
          <p>Cancel</p>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default ChangeOrderStatusModalBody;
const Container = styled.div`
  width: 400px;
  max-height: calc(100vh - 100px);
  overflow: auto;
  .content {
    padding: 1rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  border-top: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.overlayColor};
`;
const Button = styled.button<{ red?: boolean }>`
  background-color: ${(props) =>
    props.red ? props.theme.dangerRed : props.theme.green};
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 7px;
  position: relative;
  padding: 0.25rem 0.5rem;
  color: #fff;
  display: flex;
  align-items: center;
  p {
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    margin: 0 0.5rem;
  }
`;
