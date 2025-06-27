import Home from "./Home";
import Refresh from "./Refresh";
import Return from "./Return";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import StripeTest from "./StripeTest";
import StripeCheckout from "./StripeCheckout";
import StripeCheckoutTest from "./StripeParent";
import StripeParent from "./StripeParent";
import CreateAccount from "./CreateAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/refresh/:connectedAccountId",
    element: <Refresh />,
  },
  {
    path: "/return/:connectedAccountId",
    element: <Return />,
  },
  {
    path: 'stripetest',
    element: <StripeTest />
  },
  {
    path: 'stripecheckouttest',
    element: <StripeCheckout />
  },
  {
    path: '/stripeelementtest',
    element: <StripeCheckoutTest />
  },
  {
    path: '/stripeparent',
    element: <StripeParent />
  },
  {
    path: '/createaccount',
    element: <CreateAccount />
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}