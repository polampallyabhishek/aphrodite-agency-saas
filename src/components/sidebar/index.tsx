import { getAuthUserDetails } from "@/lib/queries";
import { SubAccount } from "@prisma/client";
import React from "react";
import MenuOptions from "./menu-options";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: Props) => {
  const user = await getAuthUserDetails();
  if (!user || !user.Agency) return null;

  const details =
    type === "agency"
      ? user.Agency
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id);

  const isWhiteLabeledAgency = user.Agency.whiteLabel;

  if (!details) return null;

  let sidebarLogo = user.Agency.agencyLogo || "/public/assets/plura-logo.svg";

  if (!isWhiteLabeledAgency) {
    if (type === "subaccount") {
      sidebarLogo =
        (details as SubAccount).subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sidebarOptions = details.SidebarOption || [];

  const subAccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access
    )
  );

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOptions}
        subAccounts={subAccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOptions}
        subAccounts={subAccounts}
        user={user}
      />
    </>
  );
};

export default Sidebar;
