import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDrillStore } from "../store/useDrillStore";

const categories = [
  { name: "All" },
  { name: "Everything" },
  { name: "Speed" },
  { name: "Spin" },
  { name: "Brace" },
  { name: "Coil" },
  { name: "Elbow" },
  { name: "Off Arm" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } =
    useDrillStore();

  return (
    <Disclosure as="header" className="relative bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </div>
          </div>
          <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <div className="grid w-full grid-cols-1 sm:max-w-xs">
              <input
                name="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
              />
            </div>
          </div>
          <div className="relative z-10 flex items-center lg:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-600">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
        </div>
        <nav
          aria-label="Global"
          className="hidden lg:flex lg:space-x-8 lg:py-2"
        >
          {categories.map((item) => (
            <button
              key={item.name}
              onClick={() =>
                setSelectedCategory(item.name === "All" ? null : item.name)
              }
              aria-current={
                (item.name === "All" && selectedCategory === null) ||
                selectedCategory === item.name
                  ? "page"
                  : undefined
              }
              className={classNames(
                (item.name === "All" && selectedCategory === null) ||
                  selectedCategory === item.name
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-900 hover:bg-gray-50",
                "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium",
              )}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {categories.map((item) => (
            <DisclosureButton
              key={item.name}
              as="button"
              onClick={() =>
                setSelectedCategory(item.name === "All" ? null : item.name)
              }
              aria-current={
                (item.name === "All" && selectedCategory === null) ||
                selectedCategory === item.name
                  ? "page"
                  : undefined
              }
              className={classNames(
                (item.name === "All" && selectedCategory === null) ||
                  selectedCategory === item.name
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-900 hover:bg-gray-50",
                "block rounded-md px-3 py-2 text-base font-medium w-full text-left",
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
