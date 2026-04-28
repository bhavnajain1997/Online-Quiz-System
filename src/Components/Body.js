import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login"
import Quiz from "./Quiz";
import Result from "./Result";

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path : "/",
            element : <Login/>
        },
        {
            path : "/quiz",
            element : <Quiz/>
        },
        {
            path : "/result",
            element : <Result/>
        }
    ])
    return(
        <div>
            <RouterProvider router = {appRouter}/>
        </div>
    )
}
export default Body;