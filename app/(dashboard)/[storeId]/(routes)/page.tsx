import prismadb from "@/lib/prismadb";

interface DashboardPageModal{
    params: {
        storeId: string
    }
}

const DashboardPage: React.FC<DashboardPageModal> = async ({
    params
}) =>{

    const store = await prismadb.store.findFirst({
        where:{
            id: params.storeId,
        }
    }); 
    return(
        <div> This is the Active Store: {store?.name}</div>
    );
}

export default DashboardPage;