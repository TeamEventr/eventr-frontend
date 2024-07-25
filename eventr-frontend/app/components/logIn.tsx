export default function LogIn() {
    return (
        <div className="w-96 h-[480px] bg-zinc-950 bg-opacity-50 backdrop-blur-md flex flex-col items-center filter rounded-lg border border-gray-500 border-opacity-10">
            <h1 className="mb-6 text-xl rounded-t-lg bg-zinc-900 text-center w-full h-16">Login</h1>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-300">Email</label>
                    <input className="h-8 w-72 rounded-lg hover:ring-1 focus:ring-1 ring-gray-900 outline-none py-5 px-2 bg-zinc-950 border border-gray-500 border-opacity-10"/>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-300">Password</label>
                    <input type="password" className="h-8 w-72 rounded-lg hover:ring-1 focus:ring-1 ring-gray-900 outline-none py-5 px-2 bg-zinc-950 border border-gray-500 border-opacity-10"/>
                    <div className="flex justify-between text-gray-400">
                        <div className="flex mt-1 items-center gap-1 ">
                            <input type="checkbox"/>
                            <label className="text-xs">Remember me</label>
                        </div>
                        <a className="text-xs underline self-end">Forgot Password?</a>
                        
                    </div>
                </div>
                <div className="mt-8">
                    <button className="border border-gray-500 border-opacity-10 bg-zinc-950 w-full p-2 rounded-lg hover:ring-1 focus:ring-1 ring-gray-900 text-gray-300">Log In</button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-gray-300 opacity-50 text-sm">or</p>
                    <button className="border border-gray-500 border-opacity-10 w-full mt-3 bg-zinc-950 hover:ring-1 focus:ring-1 ring-gray-900 p-2 rounded-lg flex gap-2 items-center justify-center">                         
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        <p className="text-gray-300">Sign In with Google</p>
                    </button>
                </div>
            </div>
        </div>
    )
}