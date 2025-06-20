import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";
import HighlightText from "../../../common/HighlightText";
import { toast } from "react-hot-toast"; // Changed from react-toastify to react-hot-toast


const GENDERS = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const submitProfileForm = async (data) => {
  try {
    // Format the data properly
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      about: data.about || "", // Handle empty about
      contactNumber: data.contactNumber || null // Handle empty contact
    };

    console.log("Submitting profile data:", formData); // Add this line
    
    dispatch(updateProfile(token, formData));
  } catch (error) {
    console.error("Form submission error:", error);
    toast.error(error.message || "Failed to submit form");
  }
};

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-richblack-5 mb-6">
          Edit <HighlightText text="Profile" />
        </h2>
        
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                className="form-style w-full"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-xs text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                className="form-style w-full"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-xs text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="form-style w-full"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-xs text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                id="gender"
                className="form-style w-full"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {GENDERS.map((gender, i) => (
                  <option key={i} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-xs text-yellow-100">
                  Please select your gender.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style w-full"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-xs text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <textarea
                id="about"
                placeholder="Enter Bio Details"
                className="form-style w-full h-24"
                {...register("about")}
                defaultValue={user?.additionalDetails?.about}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-lg bg-richblack-700 py-2 px-5 font-medium text-richblack-50 hover:bg-richblack-600 transition-all"
        >
          Cancel
        </button>
        <IconBtn 
          type="submit" 
          text="Save" 
          customClasses="bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
        />
      </div>
    </form>
  );
}
