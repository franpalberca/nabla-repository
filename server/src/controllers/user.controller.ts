import {Request, Response} from 'express';
import prisma from '../db/clientPrisma';
import {uploadImage} from '../utils/cloudinary';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
	throw new Error('JWT_SECRET is not defined');
}

export const createUser = async (req: Request, res: Response) => {
	const {userName, userEmail, userPassword} = req.body;

	try {
		// Check if all required fields are provided
		if (!userName || !userEmail || !userPassword) {
			return res.status(400).send({
				status: 'error',
				error: 'Email and password are required fields.',
			});
		}

		// Check if the email already exists in the database
		const emailExist = await prisma.user.findUnique({
			where: {userEmail: userEmail},
		});

		if (emailExist) {
			// If the email already exists, return the data of the existing user
			return res.status(200).send({
				status: 'success',
				message: 'User already exists.',
				user: emailExist,
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(userPassword, 10);

		// Create the new user
		const newUser = await prisma.user.create({
			data: {
				userName: userName,
				userEmail: userEmail,
				userPassword: hashedPassword,
			},
		});

		return res.status(201).send({
			message: 'User created successfully!',
			user: newUser,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const {userEmail, userPassword} = req.body;
	try {
		const user = await prisma.user.findUnique({
			where: {userEmail: userEmail},
			select: {
				userId: true,
				userEmail: true,
				userName: true,
				userImage: true,
				userPassword: true,
				userCreatedAt: true,
			},
		});

		if (!user) {
			return res.status(404).send({error: 'User not found'});
		}

		const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
		if (!passwordMatch) {
			return res.status(401).send({error: 'Invalid password'});
		}
		const token = jwt.sign({userId: user.userId}, JWT_SECRET, {expiresIn: '1h'});

		res.cookie('token', token, {httpOnly: true, secure: true});

		const {userPassword: _, ...userWithoutPassword} = user;
		return res.status(200).send({message: 'Login successful', user: userWithoutPassword, token});
	} catch (error) {
		console.error(error);
		return res.status(500).send({error: 'Internal server error'});
	}
};
export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const allUsers = await prisma.user.findMany();

		return res.status(201).send({message: 'User created successfully!', user: allUsers});
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};

export const updateUserById = async (req: Request, res: Response) => {
	const {userId} = req.params;
	const {userName, userEmail} = req.body;
	const userImage = req.file
	console.log(req.file)

	try {
		if (!userImage) {
			return res.status(400).send({error: 'Image is missing'});
		}
		if (!userName || !userEmail) {
			return res.status(400).send({error: 'Name and email are required fields'});
		}

		const upload = await uploadImage(userImage.path);

		fs.unlinkSync(userImage.path);

		const updateUser = await prisma.user.update({
			where: {userId: userId},
			data: {userName, userEmail, userImage: upload?.secure_url},
		});
		const {userPassword: _, ...userWithoutPassword} = updateUser;
		return res.status(201).send({status: 'success', message: 'User updated successfully!', user: userWithoutPassword});
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};

export const deleteUserById = async (req: Request, res: Response) => {
	const {userId} = req.params;

	try {
		const deleteUser = await prisma.user.delete({where: {userId: userId}});
		if (!deleteUser) {
			return res.status(204).send();
		}

		return res.status(204).send({message: 'User deleted successfully!'});
	} catch (err) {
		console.error(err);
		return res.status(500).send({error: 'Internal server error'});
	}
};
