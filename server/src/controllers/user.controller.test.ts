import {Request, Response} from 'express';
import {createUser, loginUser, getAllUsers, updateUserById, deleteUserById} from './user.controller';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import prismaMock from '../mocks/prisma.mock';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../utils/cloudinary');
jest.mock('fs', () => ({
	...jest.requireActual('fs'),
	unlinkSync: jest.fn(),
}));

describe('User Controller', () => {
	let req: Partial<Request>;
	let res: Partial<Response>;

	beforeEach(() => {
		req = {};
		res = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn().mockReturnThis(),
			cookie: jest.fn(),
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('createUser', () => {
		it('should create a user successfully', async () => {
			req.body = {userName: 'Test User', userEmail: 'test@example.com', userPassword: 'password123'};

			(bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

			prismaMock.user.findUnique.mockResolvedValue(null);
			prismaMock.user.create.mockResolvedValue({
				userId: '1',
				userName: 'Test User',
				userEmail: 'test@example.com',
				userPassword: 'hashedPassword',
				userImage: null,
				userCreatedAt: new Date(),
				userUpdatedAt: new Date(),
				isAdmin: false,
			});

			await createUser(req as Request, res as Response);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.send).toHaveBeenCalledWith({
				message: 'User created successfully!',
				user: {
					userId: '1',
					userName: 'Test User',
					userEmail: 'test@example.com',
					userPassword: 'hashedPassword',
					userImage: null,
					userCreatedAt: expect.any(Date),
					userUpdatedAt: expect.any(Date),
					isAdmin: false,
				},
			});
		});
	});

	describe('loginUser', () => {
		it('should login a user successfully', async () => {
			req.body = {userEmail: 'test@example.com', userPassword: 'password123'};

			prismaMock.user.findUnique.mockResolvedValue({
				userId: '1',
				userEmail: 'test@example.com',
				userName: 'Test User',
				userPassword: 'hashedPassword',
				userImage: null,
				userCreatedAt: new Date(),
				userUpdatedAt: new Date(),
				isAdmin: false,
			});

			(bcrypt.compare as jest.Mock).mockResolvedValue(true);
			(jwt.sign as jest.Mock).mockReturnValue('token');

			await loginUser(req as Request, res as Response);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith({
				message: 'Login successful',
				user: {
					userId: '1',
					userEmail: 'test@example.com',
					userName: 'Test User',
					userImage: null,
					userCreatedAt: expect.any(Date),
					userUpdatedAt: expect.any(Date),
					isAdmin: false,
				},
				token: 'token',
			});
		});
	});

	describe('getAllUsers', () => {
		it('should get all users successfully', async () => {
			const mockUsers = [
				{
					userId: '1',
					userEmail: 'test@example.com',
					userName: 'Test User',
					userPassword: 'hashedPassword',
					userImage: null,
					userCreatedAt: new Date(),
					userUpdatedAt: new Date(),
					isAdmin: true,
				},
			];

			prismaMock.user.findMany.mockResolvedValue(mockUsers);
			await getAllUsers(req as Request, res as Response);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.send).toHaveBeenCalledWith({
				message: 'Users retrieved successfully!',
				user: mockUsers,
			});
		});
	});

	describe('updateUserById', () => {
		it('should update a user successfully', async () => {
			req.params = {userId: '1'};
			req.body = {userName: 'Updated User', userEmail: 'updated@example.com'};

			const mockImagePath = '../../uploads/';
			req.file = {path: mockImagePath} as Express.Multer.File;

			const mockUpdatedAt = new Date('2024-06-21T11:08:41.165Z');

			const updateUserMock = {
				userId: '1',
				userEmail: 'updated@example.com',
				userName: 'Updated User',
				userPassword: 'hashedPassword',
				userImage: 'http://image.url',
				userCreatedAt: new Date(),
				userUpdatedAt: mockUpdatedAt,
				isAdmin: false,
			};

			prismaMock.user.update.mockResolvedValue(updateUserMock);
			await updateUserById(req as Request, res as Response);
			const {userPassword, ...userWithoutPassword} = updateUserMock;

			expect(fs.unlinkSync).toHaveBeenCalledWith(mockImagePath);
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.send).toHaveBeenCalledWith({
				status: 'success',
				message: 'User updated successfully!',
				user: userWithoutPassword,
			});
		});

		it('should return 400 if image is missing', async () => {
			req.params = {userId: '1'};
			req.body = {userName: 'Updated User', userEmail: 'updated@example.com'};

			await updateUserById(req as Request, res as Response);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.send).toHaveBeenCalledWith({error: 'Image is missing'});
		});
	});

	describe('deleteUserById', () => {
		it('should delete a user successfully', async () => {
			req.params = {userId: '1'};

			prismaMock.user.delete.mockResolvedValue({
				userId: '1',
				userEmail: 'test@example.com',
				userName: 'Test User',
				userPassword: 'hashedPassword',
				userImage: null,
				userCreatedAt: new Date(),
				userUpdatedAt: new Date(),
				isAdmin: false,
			});

			await deleteUserById(req as Request, res as Response);

			expect(res.status).toHaveBeenCalledWith(204);
			expect(res.send).toHaveBeenCalledWith({message: 'User deleted successfully!'});
		});

		it('should return 500 for server errors', async () => {
			req.params = {userId: '1'};

			prismaMock.user.delete.mockRejectedValue(new Error('Server error'));

			await deleteUserById(req as Request, res as Response);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.send).toHaveBeenCalledWith({error: 'Internal server error'});
		});
	});
});
