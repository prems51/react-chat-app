import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();

  // States for user details inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }

    return true;
  };
  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password !== conformPassword) {
      toast.error("Password does not match with confrim Password");
      return false;
    }
    return true;
  };

  // Fxns to handle login and signup
  const handleLogin = async () => {
    // console.log("Hi handleLogin involked")
    if (validateLogin()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      // console.log({response})
      if (response.data.user.id) {
        setUserInfo(response.data.user);
        if (response.data.user.profileSetup) {
          navigate("/chat");
        } else {
          navigate("/profile");
        }
      }
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      // alert("Done")
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      // console.log({response})
      if (response.status === 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 ">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <span className="text-6xl">✌️</span>
            </div>
            <p className="font-medium text-center mt-4">
              Fill in the details to get started with the best chat app!!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className=" flex bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 text-black text-opacity-90 border-b-2 rounded-none w-full"
                >
                  Log in
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 text-black text-opacity-90 border-b-2 rounded-none w-full"
                  value="signup"
                >
                  Sign up
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Log in
                </Button>
              </TabsContent>

              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6 "
                  value={conformPassword}
                  onChange={(e) => setConformPassword(e.target.value)}
                />

                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Sign up
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="flex justify-center items-center">
          You can set a image this side only for bigger screens
        </div>
      </div>
    </div>
  );
};

export default Auth;
