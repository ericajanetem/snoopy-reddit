"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { PostForm } from "@/app/components/PostForm";


const CreatePost = () => {
  return (
   <PostForm />
  );
};

export default CreatePost;

