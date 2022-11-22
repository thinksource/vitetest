import React, { ReactNode, ReactElement } from "react";
import { authProvider } from "./auth";

interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
  }
  
  let AuthContext = React.createContext<AuthContextType>(null!);

//const MyComp : React.FC<{children: React.ReactNode }> = ({children})=>(<div>{children}</div>)
interface WithChildren {
  children?:  ReactNode | ReactElement;
}

const AuthProvider : React.FC<WithChildren> = ({children}) => {
    // const {children: Children}= props;
    const [user, setUser] = React.useState<any>(null);
  
    const signin = (newUser: string, callback: VoidFunction) => {
      return authProvider.signin(() => {
        setUser(newUser);
        callback();
      });
    };
  
    const signout = (callback: VoidFunction) => {
      return authProvider.signout(() => {
        setUser(null);
        callback();
      });
    };

    const value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


function useAuth() {
    return React.useContext(AuthContext);
}

// function withMoreInfo<T> (Wrapped: T) {
//   return class WithMoreInfo extends React.Component<{ asPath: string }> {
//     static async getInitialProps ({ asPath }: { asPath: string }) {
//       return { asPath }
//     }

//     render () {
//       const { asPath } = this.props
//       const language = asPath.indexOf('/ro') === 0 ? 'ro' : 'en'
//       return <Wrapped language={ language } pathname={ asPath } />
//     }
//   }
// }

function withMoreInfo<T extends React.Component<{ language: string, pathname: string }, any>>(
  Wrapped: new (props: { language: string, pathname: string }, context?: any) => T) {
  return class WithMoreInfo extends React.Component<{ asPath: string }> {
      static async getInitialProps({ asPath }: { asPath: string }) {
          return { asPath }
      }

      render() {
          const { asPath } = this.props
          const language = asPath.indexOf('/ro') === 0 ? 'ro' : 'en'
          return <Wrapped language={language} pathname={asPath} />
      }
  }
}
// The component must have properties language and pathname and only those
class Home extends React.Component<{ language: string, pathname: string }> {
  render() {
      return <div />
  }
}



export { AuthProvider, useAuth};