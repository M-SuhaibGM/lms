import { db } from "../src/lib/db"

export const progress = async (userId, courseId

): Promise<Number> => {


    try {
        const progress = db.chapter.findMany({
            where: {
                courseId,
                isPublished: true,
            },
            select: {
                id: true,
            }
        })

        const PublishedchapterId = (await progress).map((chapter) => chapter.id)
        const VaildCompletedChapter = await db.userProgress.count({
            where: {
                userId,
                chapterId: {
                    in: PublishedchapterId
                },
                isComplited: true
            }
        })
        const progreePersentage = (VaildCompletedChapter / PublishedchapterId.length) * 100

        return progreePersentage
    } catch (e) {
        console.log(e)
        return 0

    }

}
