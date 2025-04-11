import { db } from "../src/lib/db"
import { Course, Purchase } from "@prisma/client"

type PurchaseWithCourse = Purchase & { course: Course }


const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const grouped: { [courseTitle: string]: number } = {};


    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.titte;
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle] = purchase.course.price!;
    })
    return grouped
}


export const getAnalytics = async (userId: string) => {
    try {
        const purchase = await db.purchase.findMany({
            where: {
                course: {
                    userId: userId
                }
            }, include: {
                course: true
            }


        })
        const groupedEarning = groupByCourse(purchase);
        const data = Object.entries(groupedEarning).map(([courseTitle, total]) => ({
            name: courseTitle,
            total: total,

        }))


        const totalRevenue = data.reduce((acc, cur) => acc + cur.total, 0)
        const totalSales = purchase.length;

        return{
            data,
            totalRevenue,
            totalSales, 
        }

    } catch (e) {
        console.log(e)
        return {
            data: [],
            totalRevenue: 0,
            totalSales: 0,
        }
    }
}