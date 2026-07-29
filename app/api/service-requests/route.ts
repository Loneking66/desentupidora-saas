import { NextResponse } from "next/server";
import { mockServiceRequests } from "@/data/mockedServiceRequests";
import { STATUS } from "@/constants/status";


import type {
  CreateServiceRequestInput,
  ServiceRequest,
} from "@/types/serviceRequests";

export async function GET() {
  return NextResponse.json(mockServiceRequests);
}

export async function POST(request: Request) {
  const input: CreateServiceRequestInput = await request.json();

  const newServiceRequest: ServiceRequest = {
    id: mockServiceRequests.length + 1,
    ...input,
    openedAt: new Date().toISOString(),
    status: STATUS.OPEN,
  };

  mockServiceRequests.push(newServiceRequest);
  return NextResponse.json(newServiceRequest, { status: 201 });
}
