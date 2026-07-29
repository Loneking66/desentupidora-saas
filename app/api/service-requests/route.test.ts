import { describe, expect, it } from "vitest";
import { POST } from "./route";
import { STATUS } from "@/constants/status";

import type { CreateServiceRequestInput } from "@/types/serviceRequests";


describe("POST /api/service-requests", () => {
  it("creates a service request with server generated fields", async () => {
    const input: CreateServiceRequestInput = {
        customer: "Eric",
        phone: "18999999999",
        address: "Presidente Prudente",
        description: "Clogged drain",
        priority: "High",
        technician: "João Pedro",
    };

    const request = new Request(
        "http://localhost/api/service-requests",
        { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        },
    );

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toMatchObject({
        ...input,
        status: STATUS.OPEN,
    });
    expect(body.id).toBeDefined();
    expect(body.openedAt).toBeDefined();
  });
});