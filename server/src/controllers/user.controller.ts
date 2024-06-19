import {Request, Response} from 'express';
import prisma from '../db/clientPrisma';
import {uploadImage} from '../utils/cloudinary';
import {v4 as uuidv4} from 'uuid';
import { AuthenticatedRequest } from '../types/types';
import bcrypt from 'bcrypt'

export const createUser = async (req: Request, res: Response) => {
    const { userName, userEmail, userPassword } = req.body;

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
            where: { userEmail: userEmail },
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
        return res.status(500).send({ error: 'Internal server error' });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    const { userEmail, userPassword } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { userEmail: userEmail },
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
            return res.status(404).send({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid password' });
        }
		req.setTimeout(12000, () => {
			res.status(408);
			res.send("Request timeout")
		})
        return res.status(200).send({ user: user });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};

export const getUserByEmail = async (req: AuthenticatedRequest, res: Response) => {
	const {userEmail} = req.params;

	try {
		if (req.user?.email !== userEmail) {
			return res.status(403).send({error: 'Unauthorized access'});
		}
		const userById = await prisma.user.findUnique({
			where: {
				userEmail: userEmail,
			},
			select: {
				userId: true,
				userName: true,
				userImage: true,
			},
		});
		if (!userById) {
			return res.status(404).send({error: 'User not found'});
		}

		return res.status(200).send(userById);
	} catch (err) {
		console.error(err);
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
	try {
		if (!req.files?.userImage) {
			return res.status(400).send({error: 'Image is missing'});
		}
		if (!userName || !userEmail) {
			return res.status(400).send({error: 'name and email are required fields'});
		}

		const imageVerification = req.files.userImage;

		if ('tempFilePath' in imageVerification) {
			const upload = await uploadImage(imageVerification.tempFilePath);

			const updateUser = await prisma.user.update({
				where: {userId: userId},
				data: {userName, userEmail, userImage: upload?.secure_url},
			});

			return res.status(201).send({status: 'success', message: 'User updated successfully!', user: updateUser});
		}
	} catch (err) {
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
