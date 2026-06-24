import React from "react";
import UserProfileComponent from "@/components/profile/profileCard";
import { getUserSession } from "@/lib/core/session";

const tenantProfilePage = async () => {
  const user = await getUserSession();
  return (
    <div>
      <UserProfileComponent user={user} />
    </div>
  );
};

export default tenantProfilePage;
