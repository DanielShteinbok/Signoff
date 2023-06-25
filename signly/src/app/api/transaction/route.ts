import { MetaMaskSDK } from "@metamask/sdk";
import { NextResponse, type NextRequest } from "next/server";

const MMSDK = new MetaMaskSDK();

const ethereum = MMSDK.getProvider();

export async function GET(request: NextRequest) {
    // const body = await request.body.json();
    console.log(request);
    // const signature = "1f2a7b" + "0".repeat(130);

    const signed = await ethereum.request({method: "eth_signTypedData_v4", params: []});
    // console.log(signed)

  // return basic response with basic json
    return NextResponse.json({
        message: "Hello from the API",


    });
}
