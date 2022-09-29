import React, {
  FC,
  createContext,
  ReactNode,
  ReactElement,
  useContext,
} from "react";
import Store from ".";

const StoreContext = createContext<Store>({} as Store);
export const useStoreContext = () => useContext(StoreContext);

export type StoreComponent = FC<{
  children: ReactNode;
}>;

export const StoreProvider: StoreComponent = ({ children }): ReactElement => {
  // const store: Store = new Store();
  return (
    <StoreContext.Provider value={new Store()}>{children}</StoreContext.Provider>
  );
};
