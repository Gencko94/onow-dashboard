import { screen, fireEvent } from "@testing-library/react";
import { render, simulateMouseClick } from "../../test-utils";
import useConfirmationModal from "./useConfirmationModal";

const ConfirmationModalTest = () => {
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  return (
    <button
      onClick={() =>
        setConfirmationModalStatus({
          closeCb: handleCloseConfirmationModal,
          desc: "description",
          title: "Modal Title",
          successCb: () => {},
          open: true,
        })
      }
    >
      Open Modal
    </button>
  );
};
jest.mock("./useConfirmationModal");
describe("useConfirmationModal functions", () => {
  const handleCloseConfirmationModal = jest.fn();
  const successCb = jest.fn();
  const setConfirmationModalStatus = jest.fn();

  beforeEach(() => {
    useConfirmationModal.mockImplementation(() => ({
      handleCloseConfirmationModal,
      setConfirmationModalStatus,
      confirmationModalStatus: {
        open: true,
        closeCb: handleCloseConfirmationModal,
        successCb,
        desc: "description",
        title: "Modal Title",
      },
    }));
    render(<ConfirmationModalTest />);
    simulateMouseClick(screen.getByText("Open Modal"));
  });
  it("Render Modal Without Crashing", async () => {
    expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
  });

  describe("Modal functions are called", () => {
    it("Calls the close function", () => {
      simulateMouseClick(screen.getByTestId("confirmation-modal-close-btn"));
      expect(handleCloseConfirmationModal).toBeCalled();
    });
    it("Calls the success function", () => {
      fireEvent.click(screen.getByTestId("confirmation-modal-confirm-btn"));
      expect(setConfirmationModalStatus).toBeCalled();
      expect(successCb).toBeCalled();
    });
    it("Calls the cancel function", () => {
      fireEvent.click(screen.getByTestId("confirmation-modal-cancel-btn"));
      expect(setConfirmationModalStatus).toBeCalled();
      expect(handleCloseConfirmationModal).toBeCalled();
    });
  });
});
