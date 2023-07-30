import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    params: { id: string },
    res: NextResponse) => {

    const tag = req.nextUrl.searchParams.get('tag');
    const search = req.nextUrl.searchParams.get('search');

    try {
        await connectToDb();
        let prompts;
        if (tag) {
            prompts = await Prompt.find({ "tag": tag }).populate('creator');
        } else {
            //! deprecated
            // prompts = await Prompt.find({
            //     "$or": [
            //         { "prompt": { "$regex": search ?? '' } },
            //         { "tag": { "$regex": search ?? '' } },
            //     ],
            // }).populate('creator');
            prompts = await Prompt.aggregate(
                [

                    {
                        $lookup: {
                            from: 'users',
                            localField: 'creator',
                            foreignField: '_id',
                            as: 'creator'
                        }
                    }, {
                        //? we have to invent new ways of avoiding of deprecation of our previous code so we FIX the out put of our api
                        //* {
                        //*     _id: new ObjectId("64b51887cfc52c8d09b275ee"),
                        //*     prompt: '5th',
                        //*     tag: 'Test',
                        //*     __v: 0,
                        //*     creator: {
                        //*       email: 'atenziono@gmail.com',
                        //*       username: 'saeedatenzi',
                        //*       image: 'https://lh3.googleusercontent.com/a/AAcHTtf13Xx-WxUXEKoj2K2ehrRHg0duUDTsEswtv8SDJI1GNYA=s96-c',
                        //*       __v: 0
                        //*     }
                        //*   }
                        //? Lookup returns a array, so get the first once it is a _id search
                        $replaceRoot: {
                            newRoot: {
                                $mergeObjects: [    //? merge the object
                                    '$$ROOT',       //? Get base object
                                    {
                                        creator: {
                                            $arrayElemAt: ['$creator', 0], //Get first elemnt
                                        },
                                    },
                                ],
                            },
                        },
                    }, {
                        $match: {
                            "$or": [
                                { "prompt": { "$regex": search ?? '' } },
                                { "tag": { "$regex": search ?? '' } },
                                { "creator.username": { "$regex": search ?? '' } },
                            ]
                        }
                    },
                ]
            );
            console.log('populated', prompts);
        }
        // find({ prompt: search }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}