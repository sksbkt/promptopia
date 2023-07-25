import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    params: { id: string },
    res: NextResponse) => {

    const search = req.nextUrl.searchParams.get('search');
    console.log(search);

    try {
        await connectToDb();
        const prompts = await Prompt.find({ "prompt": { "$regex": search ?? '' } }).populate('creator');
        // find({ prompt: search }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}