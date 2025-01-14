"use client";

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

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background font-urbanist">
      <Card className="w-[350px] bg-card text-card-foreground">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-foreground">Sign in</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            onClick={() => signIn("google")}
            className="bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
