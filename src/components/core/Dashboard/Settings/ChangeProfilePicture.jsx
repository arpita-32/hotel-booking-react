import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";
import HighlightText from "../../../common/HighlightText";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

const handleFileUpload = () => {
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("displayPicture", imageFile);
    dispatch(updateDisplayPicture(token, formData)).then(() => {
      // ✅ Removed toast here
      setLoading(false);
    });
  } catch (error) {
    console.error("ERROR MESSAGE - ", error.message);
  }
};



  useEffect(() => {
    if (imageFile) previewFile(imageFile);
  }, [imageFile]);
 return (
    <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <div className="relative">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-16 md:w-20 lg:w-[78px] rounded-full object-cover border-2 border-richblack-500"
          />
        </div>
        <div className="space-y-3 md:space-y-4 w-full">
          <p className="text-base md:text-lg font-medium text-richblack-5">
            Change <HighlightText text="Profile Picture" />
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            {/* ... (rest of the component remains the same, just adjust button sizes) */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              disabled={loading}
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-lg bg-richblack-700 py-2 px-4 md:px-5 font-medium text-richblack-50 hover:bg-richblack-600 transition-all duration-200"
            >
              Select
            </button>
           
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
              customClasses="bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
            >
              {!loading && <FiUpload className="text-lg" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}