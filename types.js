  import { isTs } from "./args.js";
  const ext = isTs ? 'tsx' : 'jsx';
  const typeUser = isTs ? 'type User = { email: string };\n\ntype AuthContextValue = {\n  user: User | null;\n  login: (email: string, password: string) => void;\n  logout: () => void;\n};\n\n' : '';
  const createContextGeneric = isTs ? '<AuthContextValue | null>' : '';
  const providerProps = isTs ? '({ children }: { children: React.ReactNode })' : '({ children })';
  const protectedProps = isTs ? '({ children }: { children: React.ReactNode })' : '({ children })';
  export { typeUser, createContextGeneric, providerProps, protectedProps, ext };