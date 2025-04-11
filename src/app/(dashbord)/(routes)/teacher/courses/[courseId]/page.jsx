
import { db } from "../../../../../../lib/db";
import { CircleDollarSign, LayoutDashboard, ListCheck, File } from "lucide-react";
import FormTitle from "../../../../_components/FormTitle";
import DescriptionForm from "../../../../_components/DescriptionForm";
import ImageForm from "../../../../_components/UploadImageForm";
import { redirect } from "next/navigation";
import CategoryForm from "../../../../_components/CategoryForm";
import PriceForm from "../../../../_components/PriceForm";
import AttachmentForm from "../../../../_components/AttachmentForm";
import ChapterForm from "../../../../_components/ChapterForm";
import Banner from "../../../../../../components/ui/Banner";
import ChapterAction from "../../../../_components/Action";


export default async function CoursePage({ params }) {



    const { courseId } = await params;

    const course = await db.course.findUnique({
        where: { id: courseId },
        include: {
            attachments: {
                orderBy: {
                    createdAt: "desc"
                }
            },
            chapters: {
                orderBy: {
                    position: "asc"
                }
            }
        },

    });

    if (!course && !courseId) {
        redirect("/");
    }

    const categorys = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });



    const RequreFields = [
        course.titte,
        course.description,
        course.imageUrl,
        course.categoryId,
        course.price,
        course.chapters.some(chapter => chapter.isPublished)
    ]
    const TotalFields = RequreFields.length;
    const ComplitedFields = RequreFields.filter(Boolean).length;
    const ComplitionText = `(${ComplitedFields}/${TotalFields})`
    const isComplete = RequreFields.every(Boolean)

    return (
        <div className="overflow-y-scroll h-[86.5vh]   scrollbar-hidden ">
            {!course.isPublished && <Banner variant='warning' label='Course is not Publish' />}
            <div className="p-6   ">
                <div className="flex items-center  justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Course Setup
                        </h1>
                        <span className="text-sm text-slate-700 ">Complite all  fields {ComplitionText} </span>
                    </div>
                    <ChapterAction course={course} disabled={!isComplete} />
                </div>
                <div className="grid  grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <LayoutDashboard size={40} className="bg-blue-500 rounded-full p-2 " />
                            <h2 className="text-xl">Custmize Your Course</h2>
                        </div>
                        <FormTitle data={course} />
                        <DescriptionForm data={course} />
                        <ImageForm data={course} />
                        <CategoryForm data={course} options={categorys?.map((category) => ({ label: category.name, value: category.id }))} />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <ListCheck size={40} className="bg-blue-500 rounded-full p-2" />
                                <h2 className="text-xl">Course Chapters</h2>
                            </div>
                            <ChapterForm data={course} />
                        </div>
                        <div>
                            <div>
                                <div className="flex items-center gap-x-2">
                                    <CircleDollarSign size={40} className="bg-blue-500 rounded-full p-2" />
                                    <h2 className="text-xl">Course Pricing</h2>
                                </div>
                                <PriceForm data={course} />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <File size={40} className="bg-blue-500 rounded-full p-2" />
                                <h2 className="text-xl"> Attachment & Resources</h2>
                            </div>
                            <AttachmentForm data={course} />

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
