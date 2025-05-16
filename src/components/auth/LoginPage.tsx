import { useState } from "react";
import LoginForm from "./LoginForm";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Login attempt with:", values);
    setIsLoading(false);
    // In a real app, you would handle authentication here
  };

  const handleSignUpClick = () => {
    console.log("Navigate to sign up page");
    // In a real app, you would navigate to the sign-up page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">EventBooker</h1>
          <p className="text-muted-foreground">Sign in to manage your events</p>
        </div>

        <LoginForm onSubmit={handleLogin} onSignUpClick={handleSignUpClick} />
      </motion.div>
    </div>
  );
}
