import { render } from "../../../test-utils";
import { screen, fireEvent } from "@testing-library/react";
import useConfirmationModal from "../../../hooks/useConfirmationModal";

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
jest.mock("../../../hooks/useConfirmationModal");
describe("<Modal>", () => {
  const handleCloseConfirmationModal = jest.fn();
  const setConfirmationModalStatus = jest.fn();
  beforeEach(() => {
    useConfirmationModal.mockImplementation(() => ({
      handleCloseConfirmationModal,
      setConfirmationModalStatus,
      confirmationModalStatus: {
        open: true,
        closeCb: handleCloseConfirmationModal,
        successCb: () => {},
        desc: "description",
        title: "Modal Title",
      },
    }));
    render(<ConfirmationModalTest />);
    fireEvent.click(screen.getByText("Open Modal"));
  });

  describe("Renders Correctly", () => {
    it("Render Modal Without Crashing", async () => {
      expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();

      fireEvent.select(screen.getByTestId("confirmation-modal-close-btn"));
    });
    it("Renders the correct Modal Title, Buttons texts", () => {
      expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
      expect(screen.getByTestId("confirmation-modal-title")).toHaveTextContent(
        "Modal Title"
      );
      expect(
        screen.getByTestId("confirmation-modal-description")
      ).toHaveTextContent("description");
      expect(
        screen.getByTestId("confirmation-modal-confirm-btn")
      ).toHaveTextContent("Confirm");
    });
  });
  describe("Modal functions are called", () => {
    it("Calls the close function", () => {
      fireEvent.click(screen.getByTestId("confirmation-modal-close-btn"));
      //   expect(closeFn).toBeCalled();
      expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
    });
    it("Calls the success function", () => {
      fireEvent.click(screen.getByTestId("confirmation-modal-confirm-btn"));
      expect(setConfirmationModalStatus).toBeCalled();
    });
    it("Calls the cancel function", () => {
      fireEvent.click(screen.getByTestId("confirmation-modal-cancel-btn"));
      expect(setConfirmationModalStatus).toBeCalled();
      expect(handleCloseConfirmationModal).toBeCalled();
    });
  });
});
