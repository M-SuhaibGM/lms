
import { isTeacher } from "../../../../../actions/Teacher";
import { auth} from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const layout = async ({ children }) => {
    const {userId} = await auth();

    if (!isTeacher(userId)) {
        return redirect('/')
    }

    return (
        <>
            {children}
        </>
    );
}

export default layout;