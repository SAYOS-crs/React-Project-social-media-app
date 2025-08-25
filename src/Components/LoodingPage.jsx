import React from "react";
import { Spinner } from "@heroui/react";

export default function LoodingPage() {
  return (
    <div className="h-screen text-center flex flex-row justify-center">
      <Spinner
        classNames={{ label: "text-foreground mt-4" }}
        label=""
        variant="dots"
      />
    </div>
  );
}
