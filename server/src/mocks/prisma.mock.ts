import {PrismaClient} from '@prisma/client';
import {mockDeep, DeepMockProxy, mockReset} from 'jest-mock-extended';

import prisma from '../db/clientPrisma';

jest.mock('../db/clientPrisma', () => ({
	__esModule: true,
	default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
	mockReset(prismaMock);
});

export default prismaMock;
