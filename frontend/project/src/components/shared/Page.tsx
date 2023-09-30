import React, { useEffect } from "react";

const Page = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title ? `Isatis - ${title}` : "Isatis";
  }, [title]);

  return null;
};

export default Page;
