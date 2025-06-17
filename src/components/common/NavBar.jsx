import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
import { apiConnector } from "../../services/apiconnector.js"
import { roomCategories } from "../../services/apis.js"
import { ACCOUNT_TYPE } from "../../utils/constants.js"
import ProfileDropdown from "../components/common/ProfileDropDown.jsx"

function NavBar() {
  const { token } = useSelector((state) => state.auth)
  // const { user } = useSelector((state) => state.profile)
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [roomTypes, setRoomTypes] = useState([])
  const [loading, setLoading] = useState(false)
  const [roomsDropdownOpen, setRoomsDropdownOpen] = useState(false)

  // Define navigation links
  const NavbarLinks = [
    { title: "Home", path: "/" },
    { title: "Rooms", path: "/rooms" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" }
  ]

  // Using Unsplash image URL for the hotel logo
  const hotelLogo = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", roomCategories.GET_ALL_ROOMS_API)
        setRoomTypes(res.data.data)
      } catch (error) {
        console.log("Could not fetch Room Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleRoomsDropdown = () => {
    setRoomsDropdownOpen(!roomsDropdownOpen)
  }

  return (
    <div
      className={`flex h-16 items-center justify-evenly border-b-[1px] border-b-gray-200 ${
        location.pathname !== "/" ? "bg-white" : "bg-white"
      } transition-all duration-200 fixed w-full z-50`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo using Unsplash image */}
        <Link to="/" className="flex items-center">
          <img 
            src={hotelLogo} 
            alt="Luxury Haven Hotel Logo" 
            className="h-10 w-10 rounded-full object-cover mr-2"
          />
          <span className="text-xl font-bold text-gray-800">Luxury Haven</span>
        </Link>
        
        {/* Desktop Navigation links */}
        <nav className="hidden md:block mx-auto">
          <ul className="flex gap-x-6 text-gray-800">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Rooms" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/rooms/:roomType")
                        ? "text-orange-500"
                        : "text-gray-800"
                    }`}
                  > 
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-white p-4 text-gray-800 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] shadow-lg">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-white"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : (roomTypes && roomTypes.length) ? (
                        <>
                          {roomTypes
                            ?.filter(
                              (roomType) => roomType?.rooms?.length > 0
                            )
                            ?.map((roomType, i) => (
                              <Link
                                to={`/rooms/${roomType.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-2 pl-4 hover:bg-gray-100"
                                key={i}
                              >
                                <p>{roomType.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Room Types Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-orange-500"
                          : "text-gray-800 hover:text-orange-500"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Desktop Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-orange-500 bg-transparent px-[12px] py-[8px] text-orange-500 hover:bg-orange-50 transition-colors">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] bg-orange-500 px-[12px] py-[8px] text-white hover:bg-orange-600 transition-colors">
                Sign up
              </button>
            </Link>
          )}

          {token !== null && (
            <Link to="/book">
              <button className="rounded-[8px] bg-orange-500 px-[12px] py-[8px] text-white hover:bg-orange-600 transition-colors">
                Book Now
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <AiOutlineClose fontSize={24} />
          ) : (
            <AiOutlineMenu fontSize={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 border-b border-gray-200 shadow-md">
          <div className="flex flex-col p-4 space-y-4">
            {NavbarLinks.map((link, index) => (
              <div key={index}>
                {link.title === "Rooms" ? (
                  <div className="flex flex-col">
                    <button 
                      onClick={toggleRoomsDropdown}
                      className={`flex items-center justify-between py-2 ${
                        matchRoute("/rooms/:roomType")
                          ? "text-orange-500"
                          : "text-gray-800"
                      }`}
                    >
                      <span>{link.title}</span>
                      <BsChevronDown className={`transition-transform ${roomsDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {roomsDropdownOpen && (
                      <div className="pl-4 mt-2 space-y-2">
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (roomTypes && roomTypes.length) ? (
                          roomTypes
                            ?.filter((roomType) => roomType?.rooms?.length > 0)
                            ?.map((roomType, i) => (
                              <Link
                                to={`/rooms/${roomType.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="block py-2 text-gray-800 hover:text-orange-500"
                                key={i}
                                onClick={toggleMobileMenu}
                              >
                                {roomType.name}
                              </Link>
                            ))
                        ) : (
                          <p className="text-center">No Room Types Found</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={link?.path} 
                    className={`block py-2 ${
                      matchRoute(link?.path)
                        ? "text-orange-500"
                        : "text-gray-800 hover:text-orange-500"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Auth/Book buttons */}
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
              {token === null && (
                <>
                  <Link to="/login" onClick={toggleMobileMenu}>
                    <button className="w-full rounded-[8px] border border-orange-500 bg-transparent px-[12px] py-[8px] text-orange-500 hover:bg-orange-50 transition-colors">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup" onClick={toggleMobileMenu}>
                    <button className="w-full rounded-[8px] bg-orange-500 px-[12px] py-[8px] text-white hover:bg-orange-600 transition-colors">
                      Sign up
                    </button>
                  </Link>
                </>
              )}

              {token !== null && (
                <>
                  <Link to="/book" onClick={toggleMobileMenu}>
                    <button className="w-full rounded-[8px] bg-orange-500 px-[12px] py-[8px] text-white hover:bg-orange-600 transition-colors">
                      Book Now
                    </button>
                  </Link>
                  <div className="pt-2">
                    <ProfileDropdown mobileMenuToggle={toggleMobileMenu} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar