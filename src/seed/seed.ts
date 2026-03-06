import { syncCategories } from "../services/category-mock.service";
import { syncOrders } from "../services/order-mock.service";
import { prisma } from "../prisma"

async function run() {
    console.log("Start syncing demo data...");

    await syncCategories();
    await syncOrders();

    console.log("All data synced");
}

run().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});;