import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";
import HighlightText from "../../../common/HighlightText";

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
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-richblack-5 mb-6">
          Profile <HighlightText text="Information" />
        </h2>
        
        {/* Form fields remain the same but with responsive classes */}
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

          {/* Other form fields... */}

        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
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