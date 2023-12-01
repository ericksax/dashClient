import * as HoverCard from "@radix-ui/react-hover-card";
import Link from "next/link";
import { UserCircle } from "@phosphor-icons/react";
import { FiEdit, FiLogOut } from "react-icons/fi";

const HoverCardDemo = () => {
  const logout = () => {
    localStorage.removeItem("@idClient");
    localStorage.removeItem("@tokenClient");
  };
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <UserCircle
          className="text-sm text-green-500 cursor-pointer"
          size={32}
        />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="flex flex-col h-20 w-28 bg-gray-800 rounded-md p-4 "
          sideOffset={5}
        >
          <Link
            className="flex items-center justify-between hover:text-gray-400"
            href="/client_edit"
          >
            Editar <FiEdit />
          </Link>
          <Link
            onClick={logout}
            className="flex items-center justify-between hover:text-gray-400"
            href="/"
          >
            Sair <FiLogOut />
          </Link>

          <HoverCard.Arrow className="fill-gray-800" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default HoverCardDemo;
