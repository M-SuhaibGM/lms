import Nevbar from "./_components/Nevbar";
import Sidebar from "./_components/Sidebar";

export default function Layout({ children }) {
    return (
        <div className="h-screen   ">
            <div className="h-[80px] fixed md:pl-56 w-full  ">
                <Nevbar />
            </div>
            <div className=" hidden md:flex h-full w-56 flex-col fixed  inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56  pt-[80px] h-full">
                {children}
            </main>
        </div>
    );
}
