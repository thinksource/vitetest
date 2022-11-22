import { Suspense,lazy } from "react";
import { Navigate } from "react-router-dom";

const About= lazy(()=>import("../views/About"))

const withLoading=(comp: JSX.Element)=>(
    <Suspense fallback={<div>Loading...</div>}>{comp}</Suspense>
)

const routes =[
    {
        path: '/',
        element: <Navigate to="/home"/>
    },{
        path: '/home',
        element: <About/>
    }
]

export {routes, withLoading}
