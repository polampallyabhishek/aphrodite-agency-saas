"use client";
import {
  deleteSubAccount,
  getSubaccountDetails,
  saveActivityLogsNotification,
} from "@/lib/queries";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  subaccountId: string;
};

const DeleteButton = ({ subaccountId }: Props) => {
  const router = useRouter();

  return (
    <div
      className="text-white"
      onClick={async () => {
        const response = await getSubaccountDetails(subaccountId);
        await deleteSubAccount(subaccountId);
        try {
          await saveActivityLogsNotification({
            agencyId: undefined,
            description: `Deleted a subaccount | ${response?.name}`,
            subAccountId: subaccountId,
          });
          router.refresh();
        } catch (error) {
          console.log("Could not delete sub account");
        }
      }}
    >
      Delete Sub Account
    </div>
  );
};

export default DeleteButton;
