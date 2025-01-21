"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginUI() {
  const router = useRouter();
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    number: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/api/login_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);
        router.push(`/`);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", data.email);
      } else {
        console.error("Login failed:", data.message || "An error occurred");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/api/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);
        router.push(`/`);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user2", data.email);
      } else {
        console.error("Login failed:", data.message || "An error occurred");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background font-urbanist">
      <Card className="w-[400px] bg-card text-card-foreground">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-foreground">
            {formType === "login" ? "Sign In" : "Sign Up"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {formType === "login"
              ? "Enter your email to sign in to your account"
              : "Fill in the details below to create an account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            onClick={() => signIn("google")}
            className="bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <form onSubmit={handleSubmit2} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {formType === "signup" && (
              <>
                <div>
                  <Label htmlFor="firstName" className="text-sm">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="number" className="text-sm">
                    Phone Number
                  </Label>
                  <Input
                    id="number"
                    name="number"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-primary-foreground hover:bg-primary/90"
            >
              {formType === "login" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {formType === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() =>
                setFormType(formType === "login" ? "signup" : "login")
              }
              className="text-gradient bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text underline"
            >
              {formType === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
