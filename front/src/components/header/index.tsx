"use client";
import { useClients } from "@/store/clientStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HoverCardDemo from "../hoverCardUser";

const Header = () => {
  const client = useClients((state) => state.client);
  const path = usePathname();

  return (
    <div className="flex sticky min-h-[95px] top-0 p-4 h-full text-white border-b border-gray-700 bg-gray-900">
      <div className="flex justify-between h-full max-w-4xl w-full m-auto px-4 items-center">
        <strong className="text-2xl">
          Dash<span className="text-gray-400">Client</span>{" "}
        </strong>
        <nav className="flex gap-4 h-full">
          {path === "/registry" ? null : (
            <span className="flex items-center gap-4">
              {client.email} <HoverCardDemo />
            </span>
          )}
          <ul className="flex h-[56px] w-32 gap-8 items-center justify-end border-l  border-gray-700">
            <li className="hover:text-gray-300 delay-75 relative"></li>
            <li className="hover:text-gray-300 delay-75">
              {path === "/clients" ? (
                <Link href="/dash">Contatos</Link>
              ) : path === "/registry" ? (
                <Link href="/">Login</Link>
              ) : path == "/dash" ? (
                <Link href="/clients">Clientes</Link>
              ) : path === "/client_edit" ? (
                <Link href="/dash">Contatos</Link>
              ) : null}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
