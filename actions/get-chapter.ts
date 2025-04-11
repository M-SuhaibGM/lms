import { db } from "../src/lib/db"
import { Attachment, Chapter } from "@prisma/client"

export const GetChapter = async ({ userId, courseId, chapterId }) => {

  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        }
      }
    });


    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
        isPublished: true,
      }
    })

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId
      },
    })


    if (!chapter || !course) {
      throw new Error("chapter not find")
    }

    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;
    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId
        }
      })


      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter.position,
          }
        },
        orderBy: {
          position: "asc"
        }
      })
    }
    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        }
      }
    })

    return {
      chapter,
      course,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    }

  } catch (e) {
    console.log(e)
    return {
      chapter: null,
      course: null,
      attachment: null,
      nextChapter: null,
      purchase: null,
      userProgress: null,

    }
  }

}
