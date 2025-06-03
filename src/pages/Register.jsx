import { useForm } from "react-hook-form";
import { registerSchema } from "../schema/authSchema";
import { register as registerAccount } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
const Register = () => {
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
    const navigate=useNavigate()
const dispatch=useDispatch()
 const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm({
     resolver: zodResolver(registerSchema),
   });
    const onSubmit = async (data) => {
       try {
         const resultAction = await dispatch(registerAccount(data));
   
         if (registerAccount.fulfilled.match(resultAction)) {
           navigate("/notes"); // redirect on successful login
         } else {
           // optional: show error message from resultAction.payload
           console.error("Login failed:", resultAction.payload);
         }
       } catch (err) {
         console.error("register failed:", err);
       }
     };
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter your email"
              {...register('email')}
            />
           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter your password"
                  {...register('password')}
            />
           {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Confirm your password"
                  {...register('confirmPassword')}
            />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}

          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          disabled={loading}>
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
};

export default Register;