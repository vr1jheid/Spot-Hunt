import { Burger } from "@mantine/core";

import { useMenu } from "../model/menuStore";

export const MenuBurgerButton = () => {
  const { open: menuOpen, setOpen: setMenuOpen } = useMenu();
  return (
    <div className="absolute right-1 top-1 z-[210]">
      <Burger opened={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
    </div>
  );
};
