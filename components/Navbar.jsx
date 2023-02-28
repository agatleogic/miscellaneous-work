import Link from "next/link";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const Navbar = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-xl">Logo</span>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            {user && (
              <Link href={"/todo"} className="mr-5 hover:text-gray-900">
                Todo
              </Link>
            )}
            {!user && (
              <Link href={"/login"} className="mr-5 hover:text-gray-900">
                login
              </Link>
            )}
            {!user && (
              <Link href={"/signup"} className="mr-5 hover:text-gray-900">
                signup
              </Link>
            )}
            {user && (
              <Link href={"/contact"} className="mr-5 hover:text-gray-900">
                Contact
              </Link>
            )}
          </nav>

          {user && (
            <button
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
