import { render, simulateMouseClick, wait } from "../../../test-utils";
import { screen } from "@testing-library/react";
import useConfirmationModal from "../../../hooks/useConfirmationModal/useConfirmationModal";

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

describe("<Modal>", () => {
  beforeEach(() => {
    render(<ConfirmationModalTest />);
    simulateMouseClick(screen.getByText("Open Modal"));
  });

  describe("Renders Correctly", () => {
    it("Clicking open renders the modal", async () => {
      expect(screen.getByTestId("confirmation-modal")).toBeInTheDocument();
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
    it("Clicking close hides the modal", async () => {
      simulateMouseClick(screen.getByTestId("confirmation-modal-close-btn"));
      await wait(1200);

      expect(
        screen.queryByTestId("confirmation-modal")
      ).not.toBeInTheDocument();
    });
    it("Clicking cancel hides the modal", async () => {
      simulateMouseClick(screen.getByTestId("confirmation-modal-cancel-btn"));
      await wait(750);
      expect(
        screen.queryByTestId("confirmation-modal")
      ).not.toBeInTheDocument();
    });
  });
});
