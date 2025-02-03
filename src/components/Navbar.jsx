import { Menu } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 bg-gradient-to-r from-indigo-600 to-purple-700 dark:bg-gray-900 border-b dark:border-gray-800 border-gray-200 fixed top-0 left-0 right-0 z-10 shadow-lg">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center px-6 h-full">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎓</span>
          <Link to="/">
            <h1 className="font-extrabold text-2xl text-white">
              FAANGPrep
            </h1>
          </Link>
        </div>
        {/* User icons and dark mode toggle */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="User Avatar"
                  />
                  <AvatarFallback>UP</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-50 dark:bg-gray-800 shadow-md">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/my-learning" className="hover:text-indigo-600">
                      My Learning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile" className="hover:text-indigo-600">
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        to="/admin/dashboard"
                        className="hover:text-indigo-600"
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl text-white">🎓 FAANGPrep</h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-indigo-100"
          variant="outline"
        >
          <Menu className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-white dark:bg-gray-900">
        <SheetHeader className="flex items-center justify-between mt-2 px-2">
          <SheetTitle>
            <Link to="/" className="text-indigo-600 font-extrabold text-lg">
               FAANGPrep
            </Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="my-4" />
        <nav className="flex flex-col space-y-4 px-4">
          <Link
            to="/my-learning"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
          >
            My Learning
          </Link>
          <Link
            to="/profile"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
          >
            Edit Profile
          </Link>
          <p
            onClick={() => navigate("/logout")}
            className="cursor-pointer text-red-500 hover:text-red-600"
          >
            Log Out
          </p>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="button"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
