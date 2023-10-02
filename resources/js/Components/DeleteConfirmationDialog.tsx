import { Modal } from "@/Components/Modal";
import { DangerButton } from "./DangerButton";
import { SecondaryButton } from "./SecondaryButton";

export interface DeleteConfirmationDialogProps {
    onCancel: () => void;
    show?: boolean;
    onConfirm?: () => void;
}

export default function DeleteConfirmationDialog({
    show = false,
    onCancel,
    onConfirm = () => {},
}: DeleteConfirmationDialogProps) {
    return (
        <Modal show={show} onClose={onCancel} maxWidth="sm">
            <Modal.Title>Izdzēst ziņojumu</Modal.Title>

            <p className="text-center">Tiešām vēlaties dzēst ziņojumu?</p>
            <div>
                <Modal.Actions>
                    <DangerButton onClick={onConfirm}>Dzēst!</DangerButton>
                    <SecondaryButton className="ml-4" onClick={onCancel}>
                        Atcelt
                    </SecondaryButton>
                </Modal.Actions>
            </div>
        </Modal>
    );
}
