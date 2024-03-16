import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { label, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        const billboard = await prismadb.billboard.create({
            data: {
                label: label,
                imageUrl: imageUrl,
                storeId: params.storeId
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARDS_POST]', error);
        return new NextResponse("Interval error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if(!params.storeId){
            return new NextResponse("Store Id is required", { status: 400});
        }
        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        });
        console.log(billboards)
        return NextResponse.json(billboards);
    }catch(error){
        console.log('[BILLBOARDS_GET]', error);
        return new NextResponse("Interval Error", {status: 500});
    }
}