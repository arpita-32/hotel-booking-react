import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import HighlightText from "../../../common/HighlightText"

export default function Settings() {
  return (
    <div className="w-full">
      <h1 className="mb-8 text-3xl font-medium text-richblack-5">
        Edit <HighlightText text="Profile" />
      </h1>
      <div className="space-y-8">
        <ChangeProfilePicture />
        <EditProfile />
        <UpdatePassword />
        <DeleteAccount />
      </div>
    </div>
  );
}
