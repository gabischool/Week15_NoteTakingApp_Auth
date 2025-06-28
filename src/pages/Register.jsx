import { useForm } from "react-hook-form";
import{z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import{ useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Register } from "../store/slices/authSlice";

const register =() => {
  const dispatch = useDispatch();
  const navigate = useNavigate
  

//react hook form
  const { Register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(RegisterSchema),
  });



  //function to send data to redux
  const onRegister= async (data) => {
    try {
      await dispatch(Register(data)).unwrap();
    } catch (error) {
      console.log( error)
    }
  }

 

  

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onRegister)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...Register("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...Register("password")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...Register("confirmPassword")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-600 hover:text-yellow-500">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
