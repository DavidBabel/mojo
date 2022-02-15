import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";

import { PrismaClient } from "~/server/prisma/singleton";

jest.mock("~/server/prisma/singleton", () => ({
  PrismaClient: mockDeep<typeof PrismaClient>(),
  __esModule: true,
}));

export const prismaMock = PrismaClient as unknown as DeepMockProxy<
  typeof PrismaClient
>;

beforeEach(() => {
  mockReset(prismaMock);
});
