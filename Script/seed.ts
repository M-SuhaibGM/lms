const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Computer science" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Photography" },
                { name: "Accounting" },
                { name: "Filming" },
                { name: "Engineering" },
            ]

        });
        console.log("Seeded categories");
    }
    catch (e) {
        console.log(e);

    } finally {
        await db.$disconnect();
    }
}
main()