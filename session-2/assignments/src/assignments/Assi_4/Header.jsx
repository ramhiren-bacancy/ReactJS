import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { theme } = useTheme();

  return <h1>Current Theme: {theme}</h1>;
};

export default Header;