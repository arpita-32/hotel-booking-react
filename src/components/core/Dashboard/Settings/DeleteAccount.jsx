import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../../services/operations/SettingsAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useState } from "react";
import HighlightText from "../../../common/HighlightText";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }
return (
    <>
      <div className="rounded-lg border border-pink-700 bg-pink-900 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-pink-700 flex-shrink-0">
            <FiTrash2 className="text-xl md:text-2xl text-pink-200" />
          </div>
          <div className="space-y-2 md:space-y-3">
            <h2 className="text-lg font-semibold text-richblack-5">
              Delete <HighlightText text="Account" />
            </h2>
            <div className="text-pink-25 space-y-1 md:space-y-2">
              <p className="text-sm md:text-base">Would you like to delete account?</p>
              <p className="text-xs md:text-sm">
                This account may contain Paid Courses. Deleting your account is
                permanent and will remove all the content associated with it.
              </p>
            </div>
            <button
              type="button"
              className="w-fit italic text-sm md:text-base text-pink-300 hover:text-pink-200 transition-colors"
              onClick={() => setConfirmationModal({
                text1: "Are You Sure?",
                text2: "All your details will be deleted and you will have to sign up again.",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => handleDeleteAccount(),
                btn2Handler: () => setConfirmationModal(false),
              })}
            >
              I want to delete my account.
            </button>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}