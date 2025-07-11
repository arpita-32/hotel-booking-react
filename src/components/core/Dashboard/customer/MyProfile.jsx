import { RiEditBoxLine } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getUserDetails } from "../../../../services/operations/profileAPI"
import { formattedDate } from "../../../../utils/dateFormatter"
import IconBtn from "../../../common/IconBtn"
import HighlightText from "../../../common/HighlightText"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  // Fetch user details when the component mounts

  // Incorrect implementation causing infinite loop
useEffect(() => {
  if (token) {
    dispatch(getUserDetails(token, navigate)) // This is causing the loop
  }
}, [token, dispatch]) // This runs whenever token or dispatch changes

  return (
    <>
      <h1 className="mb-14 py-9 text-3xl font-medium text-yellow-50">
<HighlightText text="My Profile" /></h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-gray-700 bg-gray-900 p-4 px-6">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-yellow-50">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-gray-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-gray-700 bg-gray-900 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-yellow-50">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-yellow-50"
              : "text-gray-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-gray-700 bg-gray-900 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-yellow-50">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-gray-600">First Name</p>
              <p className="text-sm font-medium text-yellow-50">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-600">Email</p>
              <p className="text-sm font-medium text-yellow-50">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-600">Gender</p>
              <p className="text-sm font-medium text-yellow-50">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-gray-600">Last Name</p>
              <p className="text-sm font-medium text-yellow-50">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-600">Phone Number</p>
              <p className="text-sm font-medium text-yellow-50">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
  <p className="mb-2 text-sm text-gray-600">Date Of Birth</p>
  <p className="text-sm font-medium text-yellow-50">
    {user?.additionalDetails?.dateOfBirth ? 
      formattedDate(user.additionalDetails.dateOfBirth) : 
      "Add Date Of Birth"
    }
  </p>
</div>

          </div>
        </div>
      </div>
    </>
  )
}