import { NextResponse } from "next/server";
import { mockServiceRequests } from "@/data/mockedServiceRequests";


export async function GET() {
  return NextResponse.json(mockServiceRequests);
}