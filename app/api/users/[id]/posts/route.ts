import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } },
    res: NextResponse,
    // ? we are sending additional params (id) for this api endpoint
) => {
    console.log(params.id);

    try {
        await connectToDb();
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}