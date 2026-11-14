import { createPortal } from "react-dom";

const AdminModal = () => {

    return createPortal(

        <div className="modal">
            <h2>Admin hei</h2>
        </div>,

        document.body

    );
};

export default AdminModal;