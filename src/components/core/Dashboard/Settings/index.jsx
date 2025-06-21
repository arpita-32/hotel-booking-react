import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import HighlightText from "../../../common/HighlightText"

export default function Settings() {
  return (
        <div className="w-full mb-14 px-4 md:px-8 lg:px-12 py-6 md:py-9">
      <h1 className="mb-8 md:mb-12 text-2xl md:text-3xl font-medium text-richblack-5">
        Edit <HighlightText text="Profile" />
      </h1>
      <div className="space-y-6 md:space-y-8">
        <ChangeProfilePicture />
        <EditProfile />
        <UpdatePassword />
        <DeleteAccount />
      </div>
    </div>

  );
}
